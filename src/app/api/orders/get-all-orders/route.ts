import dbConnect from '@/lib/dbConnect';
import orderModel from '@/models/order/order.model';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const orders = await orderModel
            .find({})
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
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error.',
                error,
            },
            { status: 500 },
        );
    }
}
