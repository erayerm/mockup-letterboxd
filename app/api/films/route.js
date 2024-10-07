import { NextResponse } from "next/server";
import Film from "@/models/film";
import connectMongoDB from "@/lib/mongodb";
import { titleSlugifier } from "@/utils/functions";

export async function POST(request, { params }) {
    try {
        const filmData = await request.json();
        filmData.slugifiedTitle = titleSlugifier(filmData.title)
        await connectMongoDB();
        const newFilm = new Film(filmData);
        await newFilm.save();
        return NextResponse.json({ message: "Film added successfully", newFilm: newFilm }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
