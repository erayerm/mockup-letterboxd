"use client"

import { faEllipsis, faEye, faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import CardNav from '../CardNav.jsx';
import { titleSlugifier } from '@/app/utils/functions.js';
import FiveStar from '../FiveStar.jsx';

function FilmPageFilmCard({
    movieData,
    isWatched,
    setIsWatched,
    isLiked,
    setIsLiked,
    isWatchlisted,
    setIsWatchlisted,
    rate,
    setRate
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleIsWatched = () => rate < 0 ? setIsWatched(prev => !prev) : false;
    const toggleIsLiked = () => setIsLiked(prev => !prev);
    const toggleIsMenuOpen = () => setIsMenuOpen(prev => !prev);

    const slugifiedTitle = titleSlugifier(movieData.title);

    return (
        <>
            <div className='w-full'>
                <div className={"group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"}
                    style={{ backgroundImage: `url(${movieData.poster})` }}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className='hidden group-hover:flex relative z-[10] gap-2 bg-[rgba(0,0,0,0.7)] px-2 py-1 mb-3 items-center justify-center text-md rounded-lg'>
                        <button onClick={toggleIsWatched}><FontAwesomeIcon className={isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                        <button onClick={toggleIsLiked}><FontAwesomeIcon className={isLiked ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                        <button onClick={toggleIsMenuOpen}><FontAwesomeIcon className='text-lg' icon={faEllipsis} /></button>
                        {isMenuOpen &&
                            <>
                                <div className='absolute z-[50] bottom-[-100%] left-[108%] bg-[#8899AA] text-[#2c3440] rounded-md shadow-lg'>
                                    <ul>
                                        <li className='p-2 text-center w-full flex justify-center'>
                                            <FiveStar greenStars={rate} setGreenStars={setRate} />
                                        </li>
                                        <CardNav movieUrl={slugifiedTitle}
                                            isWatchlisted={isWatchlisted}
                                            setIsWatchlisted={setIsWatchlisted} />
                                    </ul>
                                </div>
                                <div className="absolute -translate-x-1/2 left-[100%] size-0 border-[7px] border-[#8899AA] hidden group-hover:block border-l-transparent border-t-transparent border-b-transparent" />
                            </>
                        }
                    </div>
                    <span onClick={() => true /* TODO:Open Modal */} className="border-button cursor-pointer"></span>
                </div>
            </div>
        </>
    )
}


export default FilmPageFilmCard