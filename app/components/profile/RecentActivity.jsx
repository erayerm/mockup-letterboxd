import MovieCard from "../MovieCard"
import { movies } from "../../mock/movies.js"
import { user } from "../../mock/user.js"

import Link from "next/link"
function RecentActivity() {
    return (
        <div className="mt-5">
            <div className="flex justify-between w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">
                <h2 className="">RECENT ACTIVITY</h2>
                <Link href={`/${user.username}/films/`} className="text-[11px] text-[#678] hover:text-hover-blue">ALL</Link>
            </div>
            <div className="flex justify-between">
                {movies.map((item, index) => <MovieCard key={index} movieData={item} isRatingOn={true} />
                )}
            </div>
        </div>
    )
}

export default RecentActivity