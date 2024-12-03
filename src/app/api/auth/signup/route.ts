import dbConnect from '@/lib/dbConnect';
import userModel from '@/models/user/user.model';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { name, username, email, phoneNumber, company, country, password } =
        await req.json();

    try {
        await dbConnect();

        const rounds = process.env.BCRYPT_SAULT_ROUNDS;

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
        return new Response(
            JSON.stringify({ message: 'User created successfully' }),
            { status: 201 },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error creating user', error }),
            { status: 500 },
        );
    }
}
