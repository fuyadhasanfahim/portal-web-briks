/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, User as AdapterUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string;
            userId: string;
            name: string;
            username: string;
            email: string;
            phoneNumber: string;
            company: string;
            country: string;
            role: string;
            isActive: string;
            isVerified: string;
            emailVerificationToken: string;
            emailVerificationExpires: string;
            passwordResetToken: string;
            passwordResetExpires: string;
            failedLoginAttempts: string;
            lockUntil: string;
            createdAt: string;
            updatedAt: string;
        } & DefaultSession['user'];
    }

    interface User extends AdapterUser {
        _id: string;
        userId: string;
        name: string;
        username: string;
        email: string;
        phoneNumber: string;
        company: string;
        country: string;
        role: string;
        isActive: string;
        isVerified: string;
        emailVerificationToken: string;
        emailVerificationExpires: string;
        passwordResetToken: string;
        passwordResetExpires: string;
        failedLoginAttempts: string;
        lockUntil: string;
        createdAt: string;
        updatedAt: string;
    }

    interface JWT {
        userId: string;
        name: string;
        username: string;
        email: string;
        phoneNumber: string;
        company: string;
        country: string;
        role: string;
        isActive: string;
        isVerified: string;
        emailVerificationToken: string;
        emailVerificationExpires: string;
        passwordResetToken: string;
        passwordResetExpires: string;
        failedLoginAttempts: string;
        lockUntil: string;
        createdAt: string;
        updatedAt: string;
    }
}
