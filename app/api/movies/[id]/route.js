import connectMongoDB from "@/lib/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const movieData = await Movie.findById(id);
        if (!movieData) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }
        return NextResponse.json({ movieData }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}