import { NextResponse } from "next/server";
import WatchedMovies from "@/models/watchedMovie";
import connectMongoDB from "@/lib/mongodb";

//first time
export async function POST(request) {
    try {
        const { userID, movieID, rate, isLiked } = await request.json();
        await connectMongoDB();
        const newWatchedMovie = new WatchedMovies({
            userID,
            movieID,
            rate,
            isLiked,
            watchedTimes: 1
        });
        await newWatchedMovie.save();
        return NextResponse.json({ message: "Watched movie added successfully", newWatchedMovie }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
