import { useEffect, useState } from "react";
import MovieCard from "../MovieCard"
function FavoriteFilms() {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/movies');
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);
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