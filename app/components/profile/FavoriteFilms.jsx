import MovieCard from "../MovieCard"
import { movies } from "../../mock/movies.js"
function FavoriteFilms() {
    return (
        <div className="">
            <h2 className="w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">FAVORITE FILMS</h2>
            <div className="flex justify-between">
                {movies.map((item, index) => <MovieCard key={index} movieData={item} />
                )}
            </div>
        </div>
    )
}

export default FavoriteFilms