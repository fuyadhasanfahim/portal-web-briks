import dbConnect from '@/lib/dbConnect';
import orderModel from '@/models/order/order.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const orderData = await req.json();

        const lastOrder = await orderModel.findOne().sort({ createdAt: -1 });
        const lastOrderId = lastOrder?.orderId || 'ORDER-000000';
        const nextOrderId = `ORDER-${String(
            parseInt(lastOrderId.split('-')[1]) + 1,
        ).padStart(6, '0')}`;

        const newOrder = new orderModel({
            ...orderData,
            orderId: nextOrderId,
        });

        await newOrder.save();

        return NextResponse.json(
            { message: 'Order created successfully', order: newOrder },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Error creating order', error },
            { status: 500 },
        );
    }
}
