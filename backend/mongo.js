import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SuperMarket";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected successfully");
            return mongoose.connection;
        } catch (err) {
            console.error(`MongoDB connection error (attempt ${attempt}/${MAX_RETRIES}):`, err.message);
            if (attempt === MAX_RETRIES) {
                console.error("Max retries reached. Exiting.");
                process.exit(1);
            }
            console.log(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
            await sleep(RETRY_DELAY_MS);
        }
    }
};