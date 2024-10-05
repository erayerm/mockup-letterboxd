import { movies } from "../../mock/movies.js"

import Link from "next/link"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import MovieCard from "../MovieCard.jsx"


export default function VerticalMovieReview({ reviewData, borderBottom }) {
    const [movieData, setMovieData] = useState(movies[reviewData.movieId]);
    const ratingText = "★".repeat(reviewData.rating) + (reviewData.rating * 2 % 2 == 0 ? "" : "½")
    const likeCount = 0;
    const movieUrl = movieData.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");
    return (
        <div className={`flex justify-between ` + (borderBottom ? "border-b pb-3 mb-3 border-b-[rgba(136,153,170,0.5)]" : "")}>
            <div className="basis-[12%]">
                <MovieCard movieData={movieData} isBig={false} />
            </div>
            <div className="basis-[85%] space-y-2">
                <h3>
                    <Link href={`/film/${movieUrl}/`} className="text-[22px] text-secondary-white hover:text-hover-blue pr-2">{movieData.title}</Link>
                    <Link href={`/films/year/${movieData.date}`} className="text-[18px] text-[#89a] hover:text-hover-blue">{movieData.date}</Link>
                </h3>
                <div className="flex gap-x-4">
                    <p className="text-green-400">{ratingText}</p>
                    <p className="text-[#678]">Watched 05 May 2024</p>{/*TODO: dynamic date */}
                </div>
                <p className="text-[#9ab]">{reviewData.review}</p>
                <div>
                    {likeCount === 0
                        ? <p><FontAwesomeIcon icon={faHeart} /> No likes yet</p>
                        : <p><FontAwesomeIcon icon={faHeart} /> x likes</p>
                    }
                </div> {/*TODO: it should be different on another users profile */}
            </div>
        </div>
    )
}
