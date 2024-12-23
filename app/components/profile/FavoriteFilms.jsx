import FilmCard from "../FilmCard"
import { films } from "../../mock/films.js"
function FavoriteFilms() {
    return (
        <div className="">
            <h2 className="w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">FAVORITE FILMS</h2>
            <div className="flex justify-between">
                {films.map((item, index) => <FilmCard key={index} filmData={item} isBig={true} />
                )}
            </div>
        </div>
    )
}

export default FavoriteFilms