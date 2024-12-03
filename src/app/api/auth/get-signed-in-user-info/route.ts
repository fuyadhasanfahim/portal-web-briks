import dbConnect from '@/lib/dbConnect';
import userModel from '@/models/user/user.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        dbConnect();

        const token =
            cookies().get('accessToken')?.value ||
            cookies().get('refreshToken')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'Token not found' },
                { status: 401 },
            );
        }

        const jwt_token = process.env.JWT_SECRET!;

        if (!jwt_token) {
            throw new Error('JWT secret not found.');
        }

        const decoded = jwt.verify(token, jwt_token) as {
            userId: string;
        };

        const { userId } = decoded;
        const user = await userModel.findOne({ userId });

        if (!user) throw new Error('User not found');

        return NextResponse.json(
            {
                success: true,
                message: 'User retrieved successfully.',
                user,
            },
            { status: 200 },
        );
    } catch (error) {
        if ((error as Error).name === 'TokenExpiredError') {
            return NextResponse.json(
                { message: 'Token expired' },
                { status: 401 },
            );
        }
        
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error.',
                error,
            },
            { status: 500 },
        );
    }
}
