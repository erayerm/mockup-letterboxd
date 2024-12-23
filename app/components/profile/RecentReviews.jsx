import { user } from "../../mock/user.js"
import { reviews } from "../../mock/reviews.js"

import Link from "next/link"
import VerticalFilmReview from "./VerticalFilmReview.jsx"

function RecentReviews() {

    return (
        <div className="mt-5">
            <div className="flex justify-between w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">
                <Link href={`/${user.username}/films/reviews/by/added/`} className="hover:text-hover-blue">RECENT REVIEWS</Link>
                <Link href={`/${user.username}/films/reviews/by/added/`} className="text-[11px] text-[#678] hover:text-hover-blue">MORE</Link>
            </div>
            <div className="w-full flex flex-col">
                {[reviews[0], reviews[1]].map((item, index) => <VerticalFilmReview key={index} reviewData={item} borderBottom={index === 0} />)}
            </div>
        </div>
    )
}

export default RecentReviews