import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { username } = params;
        await connectMongoDB();
        const userData = await User.findOne({ username: username }).select('-password -updatedAt -__v -_id -createdAt');
        if (!userData) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ userData: userData, message: "User found successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { username } = params;
        const { givenName, familyName, location, photo, website, bio, pronoun, posters, replies, includeToMembers, adultContents } = await request.json();
        await connectMongoDB();
        const user = await User.findOne({ username: username });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (givenName !== undefined) user.givenName = givenName;
        if (familyName !== undefined) user.familyName = familyName;
        if (location !== undefined) user.location = location;
        if (photo !== undefined) user.photo = photo;
        if (website !== undefined) user.website = website;
        if (bio !== undefined) user.bio = bio;
        if (pronoun !== undefined) user.pronoun = pronoun;
        if (posters !== undefined) user.posters = posters;
        if (replies !== undefined) user.replies = replies;
        if (includeToMembers !== undefined) user.includeToMembers = includeToMembers;
        if (adultContents !== undefined) user.adultContents = adultContents;

        await user.save();
        return NextResponse.json({ message: "User information updated successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}