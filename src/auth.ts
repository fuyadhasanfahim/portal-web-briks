import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './lib/dbConnect';
import userModel from './models/user/user.model';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await dbConnect();

                const { email, password } = credentials!;

                if (!email || !password) {
                    throw new Error('Please provide both email and password');
                }

                const user = await userModel.findOne({ email });

                if (!user) {
                    throw new Error('No user found with that email');
                }

                const isPasswordValid = await bcrypt.compare(
                    password as string,
                    user.password as string,
                );

                if (!isPasswordValid) {
                    throw new Error('Invalid credentials');
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId;
                token.email = user.email;
                token.role = user.role;
                token.isVerified = user.isVerified;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.sub) {
                session.user = {
                    id: token.sub,
                    userId: token.userId as string,
                    email: token.email as string,
                    role: token.role as string,
                    isVerified: token.isVerified as Date,
                    emailVerified: null,
                };
            }
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        signIn: async ({ user, account }) => {
            if (account?.provider === 'credentials') {
                return true;
            } else {
                return false;
            }
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
});
