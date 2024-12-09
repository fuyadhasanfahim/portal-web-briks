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
                token._id = user._id;
                token.userId = user.userId;
                token.name = user.name;
                token.username = user.username;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.company = user.company;
                token.country = user.country;
                token.role = user.role;
                token.isActive = user.isActive;
                token.isVerified = user.isVerified;
                token.emailVerificationToken = user.emailVerificationToken;
                token.emailVerificationExpires = user.emailVerificationExpires;
                token.passwordResetToken = user.passwordResetToken;
                token.passwordResetExpires = user.passwordResetExpires;
                token.failedLoginAttempts = user.failedLoginAttempts;
                token.lockUntil = user.lockUntil;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
                token.profileImage = user.profileImage;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user = {
                    _id: token._id as string,
                    userId: token.userId as string,
                    name: token.name as string,
                    username: token.username as string,
                    email: token.email as string,
                    phoneNumber: token.phoneNumber as string,
                    company: token.company as string,
                    country: token.country as string,
                    role: token.role as string,
                    isActive: token.isActive as string,
                    isVerified: token.isVerified as string,
                    emailVerificationToken:
                        token.emailVerificationToken as string,
                    emailVerificationExpires:
                        token.emailVerificationExpires as string,
                    passwordResetToken: token.passwordResetToken as string,
                    passwordResetExpires: token.passwordResetExpires as string,
                    failedLoginAttempts: token.failedLoginAttempts as string,
                    lockUntil: token.lockUntil as string,
                    createdAt: token.createdAt as string,
                    updatedAt: token.updatedAt as string,
                    profileImage: token.profileImage as string,
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
