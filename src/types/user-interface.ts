interface IUser {
    _id: string;
    userId: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    company: string;
    country: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationExpires: Date | null;
    resetPasswordToken: string | null;
    resetPasswordExpires: Date | null;
    failedLoginAttempts: number;
    lastFailedLoginAttempt: Date | null;
    lastLogin: Date;
}

export default IUser;
