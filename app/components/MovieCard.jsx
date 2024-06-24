import { faEllipsis, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { user } from "../mock/user.js"

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

    const movieUrl = movieData.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");

    return (
        <>
            <div className='basis-[155px]'>
                <div className={"movie-card group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"}
                    style={{ backgroundImage: `url(${movieData.poster})` }}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className='hidden group-hover:flex relative z-10 gap-2 bg-[rgba(0,0,0,0.7)] px-2 py-1 mb-3 items-center justify-center text-md rounded-lg'>
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

function CardNav({ movieUrl }) {
    const movieCardNav = [
        {
            name: "Show your activity",
            link: `/${user.username}/film/${movieUrl}/activity/`
        },
        {
            name: "Log or review film...",
            link: `/${user.username}//#`
        },
        {
            name: "Add to watchlist",
            link: `/${user.username}//#`
        },
        {
            name: "Add to lists...",
            link: `/${user.username}//#`
        },
        {
            name: "Show in lists",
            link: `/film/${movieUrl}/lists/by/popular`
        },
        {
            name: "Where to watch",
            link: `/film/${movieUrl}/watch/`
        },
    ]

    return (
        <>
            {movieCardNav.map((item, index) => {
                return <li key={index} className='border-[#7E8D9E] border-t px-2 w-[180px] text-center py-1'><Link href={item.link} className=''>{item.name}</Link></li>
            })
            }
        </>
    )
}

export default MovieCard