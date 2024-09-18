import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected successfully");
            return Promise.resolve(true);
        } else {
            return Promise.reject("Failed to connect to MongoDB");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return Promise.reject(error);
    }
};

export default connectMongoDB;