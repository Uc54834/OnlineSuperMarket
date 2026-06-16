import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SuperMarket";

export const connectDB = async () => {
    try {

        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }

        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");

        return mongoose.connection;

    } catch (err) {

        console.error("MongoDB connection error:", err);
        process.exit(1);

    }
};