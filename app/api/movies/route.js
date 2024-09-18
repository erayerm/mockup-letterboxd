import { NextResponse } from "next/server";
import Movie from "@/models/movie"; // Modelin doğru dosya yolunu kontrol et
import connectMongoDB from "@/lib/mongodb";

export async function POST(request, { params }) {
    try {
        const movieData = await request.json();
        await connectMongoDB();
        const newMovie = new Movie(movieData);
        await newMovie.save();
        return NextResponse.json({ message: "Movie added successfully", newMovie }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
