import { faEllipsis, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function MovieCard({ movieData, isRatingOn }) {
    const [isWatched, setIsWatched] = useState(true);
    const [isFavorited, setIsFavorited] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const toggleIsWatched = () => {
        setIsWatched((prev) => !prev);
    }
    const toggleIsFavorited = () => {
        setIsFavorited((prev) => !prev);
    }
    const toggleIsMenuOpen = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <>
            <div className='basis-[155px]'>
                <div className={"movie-card group relative z-10 flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"} style={{ backgroundImage: `url(${movieData.poster})` }}>
                    <div className='hidden group-hover:flex relative z-20 gap-2 bg-[rgba(0,0,0,0.7)] px-2 py-1 mb-3 items-center justify-center text-md rounded-lg'>
                        <button onClick={toggleIsWatched}><FontAwesomeIcon className={isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                        <button onClick={toggleIsFavorited}><FontAwesomeIcon className={isFavorited ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                        <button onClick={toggleIsMenuOpen}><FontAwesomeIcon className='text-lg' icon={faEllipsis} /></button>
                        {isMenuOpen &&
                            <div className='absolute left-[100%]'>{/*TODO: card menu*/}</div>
                        }
                    </div>
                    <span onClick={() => router.push(`./film/${movieData.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}`)} className="border-button cursor-pointer"></span>
                </div>
                {isRatingOn &&
                    <div>
                        ★★★½ {/*TODO: replace with dynamic data */}
                    </div>
                }
            </div>
        </>
    )
}
export default MovieCard