import connectMongoDB from "@/lib/mongodb";
import Film from "@/models/film";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { slugifiedTitle } = params;
        await connectMongoDB();
        const filmData = await Film.findOne({ "slugifiedTitle": slugifiedTitle });
        if (!filmData) {
            return NextResponse.json({ message: "Film not found" }, { status: 404 });
        }
        return NextResponse.json({ filmData: filmData }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}