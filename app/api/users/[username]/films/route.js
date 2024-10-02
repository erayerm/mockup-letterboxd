import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

//only slugifiedTitle is required
//it can be used both adding a movie and updating rate, like etc.
export async function PUT(req, { params }) {
    const { username } = params;
    const { slugifiedTitle, rate, isLiked, watchedTimes, isWatchlisted } = await req.json();
    try {
        await connectMongoDB();
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const existingFilm = user.watchedFilms.find(film => film.slugifiedTitle === slugifiedTitle);
        if (existingFilm) {
            if (rate !== undefined) existingFilm.rate = rate;
            if (isLiked !== undefined) existingFilm.isLiked = isLiked;
            if (watchedTimes !== undefined) existingFilm.watchedTimes = watchedTimes;
            if (isWatchlisted !== undefined) existingFilm.isWatchlisted = isWatchlisted;
        } else {
            const newWatchedFilm = {
                slugifiedTitle
            };
            //defaults
            newWatchedFilm.rate = rate !== undefined ? rate : 0;
            newWatchedFilm.isLiked = isLiked !== undefined ? isLiked : false;
            newWatchedFilm.watchedTimes = watchedTimes !== undefined ? watchedTimes : 1;
            newWatchedFilm.isWatchlisted = isWatchlisted !== undefined ? isWatchlisted : false;

            if (!user.watchedFilms) user.watchedFilms = []
            user.watchedFilms.push(newWatchedFilm);
        }
        await user.save();
        return NextResponse.json({ message: "Film added? successfully", user }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    const { username } = params;
    const { slugifiedTitle } = await req.json();
    try {
        await connectMongoDB();
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        user.watchedFilms = user.watchedFilms.filter(film => film.slugifiedTitle !== slugifiedTitle);
        await user.save();
        return NextResponse.json({ message: "Film deleted successfully", user }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    const { username } = params;
    const { searchParams } = new URL(req.url);
    const slugifiedTitle = searchParams.get('slugifiedTitle');

    try {
        await connectMongoDB();
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const singleMovieData = user.watchedFilms.find(film => film.slugifiedTitle === slugifiedTitle);

        if (singleMovieData) {
            return NextResponse.json(singleMovieData, { status: 200 });
        }

        return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    } catch (error) {
        console.log(error); // Hata mesajını yazdır
        return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 });
    }
}
