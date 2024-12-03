import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import userModel from '@/models/user/user.model';
import { compare } from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please provide both email and password.',
                },
                { status: 400 },
            );
        }

        dbConnect();

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found.',
                },
                { status: 404 },
            );
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Incorrect password.',
                },
                { status: 401 },
            );
        }

        const { userId } = user;

        const accessToken = sign({ userId }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        const refreshToken = sign({ userId }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        const response = NextResponse.json(
            {
                success: true,
                message: 'Logged in successfully.',
                user,
                token: {
                    accessToken,
                    refreshToken,
                },
            },
            { status: 200 },
        );

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            path: '/',
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Error occurred during signin:', error);
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
