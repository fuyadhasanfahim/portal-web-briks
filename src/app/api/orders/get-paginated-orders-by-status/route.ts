import dbConnect from '@/lib/dbConnect';
import orderModel from '@/models/order/order.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const role = searchParams.get('role');
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        if (!userId || !role) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required parameters: userId and role.',
                },
                { status: 400 },
            );
        }

        const query =
            role === 'admin' || role === 'developer' || role === 'super-admin'
                ? status
                    ? { status }
                    : {}
                : status
                ? { userId, status }
                : { userId };

        const skip = (page - 1) * limit;

        const orders = await orderModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        const totalOrders = await orderModel.countDocuments(query);

        return NextResponse.json(
            {
                success: true,
                message: 'Orders fetched successfully.',
                data: {
                    orders,
                    pagination: {
                        total: totalOrders,
                        page,
                        limit,
                        totalPages: Math.ceil(totalOrders / limit),
                    },
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error.',
                error: (error as Error).message,
            },
            { status: 500 },
        );
    }
}