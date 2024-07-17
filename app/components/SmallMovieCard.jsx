import { faEllipsis, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CardNav from './CardNav.jsx';

function SmallMovieCard({ movieData, isRatingOn }) {
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

    const movieUrl = movieData.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");

    return (
        <>
            <div className='basis-[155px]'>
                <div className={"movie-card group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"}
                    style={{ backgroundImage: `url(${movieData.poster})` }}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className='hidden group-hover:flex relative z-10 bg-[rgba(0,0,0,0.7)] py-1 mb-[2px] w-full mx-[2px] items-center justify-around text-md rounded-lg'>
                        <button onClick={toggleIsWatched}><FontAwesomeIcon className={isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                        <button onClick={toggleIsFavorited}><FontAwesomeIcon className={isFavorited ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                        <button onClick={toggleIsMenuOpen}><FontAwesomeIcon className='text-lg' icon={faEllipsis} /></button>
                        {isMenuOpen &&
                            <>
                                <div className='absolute z-50 bottom-[-100%] left-[108%] bg-[#8899AA] text-[#2c3440] rounded-md shadow-lg'>
                                    <ul>
                                        <li className='p-2 text-center'>**Stars**</li>
                                        <CardNav movieUrl={movieUrl} />
                                    </ul>
                                </div>
                                <div className="absolute -translate-x-1/2 left-[100%] size-0 border-[7px] border-[#8899AA] hidden group-hover:block border-l-transparent border-t-transparent border-b-transparent" />
                            </>
                        }
                    </div>
                    <span onClick={() => router.push(`./film/${movieUrl})"`)} className="border-button cursor-pointer"></span>
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



export default SmallMovieCard