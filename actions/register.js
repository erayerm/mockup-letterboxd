"use server"

import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export const register = async (values) => {
    const { email, password, username } = values;

    try {
        await connectMongoDB();
        const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
    } catch (e) {
        console.error(e);
    }
}