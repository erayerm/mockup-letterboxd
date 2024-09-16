import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { username } = params;
        await connectMongoDB();
        const userData = await User.findOne({ username: username });
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
        const { givenName, familyName, location, photo } = await request.json();
        await connectMongoDB();
        const user = await User.findOne({ username: username });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (givenName !== undefined) user.givenName = givenName;
        if (familyName !== undefined) user.familyName = familyName;
        if (location !== undefined) user.location = location;
        if (photo !== undefined) user.photo = photo;

        await user.save();
        return NextResponse.json({ message: "User information updated successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/*------------------------------------------------------------------------------------------*/


/*
export async function PUT(request, { params }) {
    try {
        const { username } = params;
        const { givenName, familyName, location, photo } = await request.json();
        await connectMongoDB();
        const user = await User.findOne({ username: username });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (givenName !== undefined) user.givenName = givenName;
        if (familyName !== undefined) user.familyName = familyName;
        if (location !== undefined) user.location = location;
        if (photo !== undefined) user.photo = photo;

        await user.save();
        return NextResponse.json({ message: "User information updated successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(request, { params }) {
    try {
        const { username } = params;
        const { movieID, rate, isLiked, watchedTimes } = await request.json();
        await connectMongoDB();
        const user = await User.findOne({ username: username });
        let message;
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const existingMovie = user.watchedMovies.find((movie) => movie.movieID === movieID);
        if (existingMovie) {
            existingMovie.rate = rate;
            existingMovie.isLiked = isLiked;
            existingMovie.watchedTimes = watchedTimes;
            message = "Movie updated successfully";
        } else {
            user.watchedMovies.push({ movieID, rate, isLiked, watchedTimes });
            message = "Movie added successfully";
        }
        await user.save();
        return NextResponse.json({ message: message, user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
*/

/*------------------------------------------------------------------------------------------*/

/*
export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 })
}

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
*/