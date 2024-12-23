import FilmCard from "../FilmCard"
import { films } from "../../mock/films.js"
import { user } from "../../mock/user.js"

import Link from "next/link"
function RecentActivity() {
    return (
        <div className="mt-5">
            <div className="flex justify-between w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">
                <Link href={`/${user.username}/activity/`} className="hover:text-hover-blue">RECENT ACTIVITY</Link>
                <Link href={`/${user.username}/films/`} className="text-[11px] text-[#678] hover:text-hover-blue">ALL</Link>
            </div>
            <div className="flex justify-between">
                {films.map((item, index) => <FilmCard key={index} filmData={item} isRatingOn={true} isBig={true} />
                )}
            </div>
        </div>
    )
}

export default RecentActivity