import mongoose from 'mongoose';

const mongo_uri =
    process.env.MONGO_URI! ||
    'mongodb+srv://admin:NR6dyRmLq2aKPEdc@cluster0.cpvvn9x.mongodb.net/portal-web-briks-llc?retryWrites=true&w=majority&appName=Cluster0';

if (!mongo_uri) {
    throw new Error('Please define the MONGO_URI environment variable.');
}

export default async function dbConnect() {
    try {
        await mongoose.connect(mongo_uri);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Connection error:', error);
    }
}
