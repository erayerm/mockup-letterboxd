import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

//only slugifiedTitle is required
//it can be used both adding a film and updating rate, like etc.
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
            if (rate !== undefined) {
                existingFilm.rate = rate;
                existingFilm.watchedTimes = existingFilm.watchedTimes < 1 ? 1 : existingFilm.watchedTimes;
            }
            if (isLiked !== undefined) existingFilm.isLiked = isLiked;
            if (watchedTimes !== undefined) existingFilm.watchedTimes = existingFilm.watchedTimes < 1 ? 1 : watchedTimes;
            if (isWatchlisted !== undefined) existingFilm.isWatchlisted = isWatchlisted;
        } else {
            const newWatchedFilm = {
                "slugifiedTitle": slugifiedTitle
            };
            //defaults
            newWatchedFilm.rate = rate !== undefined ? rate : -1;
            newWatchedFilm.isLiked = isLiked !== undefined ? isLiked : false;
            newWatchedFilm.watchedTimes = watchedTimes !== undefined ? watchedTimes < 1 && rate > -1 ? 1 : watchedTimes : 0;
            newWatchedFilm.isWatchlisted = isWatchlisted !== undefined ? isWatchlisted : false;

            if (!user.watchedFilms) user.watchedFilms = []
            user.watchedFilms.push(newWatchedFilm);
        }
        console.log(user);
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

        const singleFilmData = user.watchedFilms.find(film => film.slugifiedTitle === slugifiedTitle);

        if (singleFilmData) {
            return NextResponse.json(singleFilmData, { status: 200 });
        }

        return NextResponse.json({ message: "Film not found", found: false }, { status: 200 });
    } catch (error) {
        console.log(error); // Hata mesajını yazdır
        return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 });
    }
}
