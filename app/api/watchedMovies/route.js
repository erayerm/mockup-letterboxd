import { NextResponse } from "next/server";
import WatchedMovies from "@/models/watchedFilm";
import connectMongoDB from "@/lib/mongodb";

//first time
export async function POST(request) {
    try {
        const { slugifiedTitle, rate, isLiked, isWatchlisted } = await request.json();
        await connectMongoDB();
        const newWatchedMovie = new WatchedMovies({
            slugifiedTitle,
            rate,
            isLiked,
            watchedTimes: 1,
            isWatchlisted
        });
        await newWatchedMovie.save();
        return NextResponse.json({ message: "Watched movie added successfully", newWatchedMovie }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
