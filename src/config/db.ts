
import mongoose from "mongoose";

const DB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in .env");
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
        process.exit(1); // Exit process with failure
    }
}

export default DB;