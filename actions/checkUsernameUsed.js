"use server"

import UsernameStatus from "@/app/enums/UsernameStatus";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export const checkUsernameUsed = async (username) => {
    try {
        await connectMongoDB();
        let userFound = await User.findOne({ username });
        return userFound ? UsernameStatus.Taken : UsernameStatus.Available;
    } catch (e) {
        console.error(e);
    }
}