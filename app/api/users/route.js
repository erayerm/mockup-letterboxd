import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { photo, username, givenName, familyName, location } = await request.json();
        await connectMongoDB();
        await User.create({ photo, username, givenName, familyName, location });
        return NextResponse.json({ message: "User Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}