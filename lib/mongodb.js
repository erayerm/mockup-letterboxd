import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected successfully");
            return cached.conn;
        } else {
            return Promise.reject("Failed to connect to MongoDB");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        return Promise.reject(error);
    }
};

export default connectMongoDB;
