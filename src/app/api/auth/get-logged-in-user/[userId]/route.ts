import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import userModel from '@/models/user/user.model';

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } },
) {
    try {
        await dbConnect();
        const { userId } = params;

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 },
            );
        }

        const user = await userModel.findOne({ userId });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 },
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user.toObject();
        return NextResponse.json({
            success: true,
            data: userWithoutPassword,
            message: 'User found successfully',
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: (error as Error)?.message || 'Internal server error',
            },
            { status: 500 },
        );
    }
}
