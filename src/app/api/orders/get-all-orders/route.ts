import dbConnect from '@/lib/dbConnect';
import orderModel from '@/models/order/order.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const role = searchParams.get('role');

        if (!userId || !role) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required parameters: userId and role',
                },
                { status: 400 },
            );
        }

        const query =
            role === 'admin' || role === 'developer' || role === 'super-admin'
                ? {}
                : { userId };

        const orders = await orderModel
            .find(query)
            .sort({ createdAt: -1 })
            .select('-__v');

        return NextResponse.json(
            {
                success: true,
                message: 'Orders fetched successfully',
                data: orders,
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
