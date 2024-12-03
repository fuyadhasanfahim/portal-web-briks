import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            sparse: true,
        },
        company: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            default: null,
        },
        emailVerificationExpires: {
            type: Date,
            default: null,
        },
        passwordResetToken: {
            type: String,
            default: null,
        },
        passwordResetExpires: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: [
                'developer',
                'super-admin',
                'admin',
                'user',
                'team-manager',
                'team-leader',
                'accountant',
            ],
            default: 'user',
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
            default: null,
        },
        lastLogin: {
            type: Date,
            default: Date,
            auto: true,
        },
    },
    {
        timestamps: true,
    },
);

const userModel = models?.User || model('User', userSchema);
export default userModel;
