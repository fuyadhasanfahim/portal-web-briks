'use server';

import dbConnect from '@/lib/dbConnect';
import userModel from '@/models/user/user.model';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { CredentialsSignin } from 'next-auth';
import { signIn } from '@/auth';

export async function signinUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        throw new Error('All fields are required');
    }

    try {
        await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password,
        });
    } catch (error) {
        const someError = error as CredentialsSignin;
        return someError.cause;
    }

    redirect('/');
}

export async function signupUser(formData: FormData) {
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const company = formData.get('company') as string;
    const country = formData.get('country') as string;
    const password = formData.get('password') as string;

    if (
        !name ||
        !username ||
        !email ||
        !phoneNumber ||
        !company ||
        !country ||
        !password
    ) {
        throw new Error('All fields are required');
    }

    try {
        await dbConnect();

        const existingUser = await userModel.findOne({ email });
        if (existingUser) throw new Error('User already exists');

        const rounds = process.env.BCRYPT_SAULT_ROUNDS;
        if (!rounds || isNaN(Number(rounds))) {
            throw new Error('BCRYPT_SAULT_ROUNDS must be a valid number');
        }

        const hashedPassword = await bcrypt.hash(password, Number(rounds));

        const lastUser = await userModel.findOne().sort({ createdAt: -1 });
        const lastUserId = lastUser?.userId || 'USER-000000';
        const nextUserId = `USER-${String(
            parseInt(lastUserId.split('-')[1]) + 1,
        ).padStart(6, '0')}`;

        const newUser = new userModel({
            userId: nextUserId,
            name,
            username,
            email,
            phoneNumber,
            company,
            country,
            password: hashedPassword,
        });

        await newUser.save();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Error creating user',
        );
    }

    redirect('/signin');
}
