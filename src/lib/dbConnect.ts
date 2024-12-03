import mongoose from 'mongoose';

const mongo_uri = process.env.MONGO_URI!;

if (!mongo_uri) {
    throw new Error('Please define the MONGODB_URI environment variable.');
}

export default async function dbConnect() {
    try {
        await mongoose
            .connect(mongo_uri)
            .then(() => console.log(`Connected to MongoDB.`))
            .catch((err) => console.error('Connection error:', err));
    } catch (error) {
        console.log(error);
    }
}
