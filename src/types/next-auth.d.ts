/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, User as AdapterUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            userId: string;
            email: string;
            role: string;
            isVerified: Date;
            emailVerified: Date | null;
        } & DefaultSession['user'];
    }

    interface User extends AdapterUser {
        id: string;
        userId: string;
        email: string;
        role: string;
        isVerified: Date;
        emailVerified: Date | null;
    }

    interface JWT {
        userId: string;
        email: string;
        role: string;
        isVerified: Date;
        emailVerified: Date | null;
    }
}
