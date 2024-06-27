import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Auth/Admin';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;
