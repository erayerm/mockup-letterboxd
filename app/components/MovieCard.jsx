"use client"

import { faEllipsis, faEye, faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CardNav from './CardNav.jsx';
import { getUsersMovieData, titleSlugifier, updateUsersMovieData } from '../utils/functions.js';
import { useSelector } from 'react-redux';
import FiveStar from './FiveStar.jsx';

function MovieCard({ movieData, isBig, isRatingOn }) {
    const session = useSelector((state) => state.session);
    const [isWatched, setIsWatched] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rate, setRate] = useState(-1);
    const [isStarted, setIsStarted] = useState(false)
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    //a card can appear more than once on a page, so I have to update the activity on all of them, but I don't know howzzzzzzzzz
    //rn I'm getting the data when I hover the card, but it's definitely the worst solution
    //TODO:find another way
    const [isHovered, setIsHovered] = useState(false);

    const toggleIsWatched = () => rate < 0 ? setIsWatched(prev => !prev) : false;
    const toggleIsLiked = () => setIsLiked(prev => !prev);
    const toggleIsMenuOpen = () => setIsMenuOpen(prev => !prev);


    const slugifiedTitle = titleSlugifier(movieData.title);

    useEffect(() => {
        if (session && isHovered) {
            try {
                (async () => {
                    const res = await getUsersMovieData(session.user.username, slugifiedTitle);
                    console.log(res);
                    setRate(res.data.rate);
                    setIsWatched(res.data.watchedTimes > 0);
                    setIsLiked(res.data.isLiked);
                    setIsWatchlisted(res.data.isWatchlisted);
                })();
                setIsStarted(true);
            } catch (error) {
                console.error(error);
            }
        }
    }, [session, isHovered])

    useEffect(() => {
        try {
            if (isStarted)
                (async () => {
                    await updateUsersMovieData(session.user.username, {
                        slugifiedTitle: slugifiedTitle,
                        rate: rate,
                        isLiked: isLiked,
                        isWatchlisted: isWatchlisted
                    });
                })()
            if (rate > -1) setIsWatched(true);
        } catch (error) {
            console.error(error)
        }
    }, [rate, isLiked, isWatchlisted])

    useEffect(() => {
        if (isStarted && rate <= 0 && isWatched == false) {
            try {
                (async () => {
                    await updateUsersMovieData(session.user.username, {
                        slugifiedTitle: slugifiedTitle,
                        watchedTimes: 0
                    });
                })()
            } catch (error) {
                console.error(error)
            }
        }
    }, [isWatched])


    return (
        <>
            <div className='basis-[155px]' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className={(isWatched ? "movie-card" : "movie-card-white") + " group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"}
                    style={{ backgroundImage: `url(${movieData.poster})` }}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className={'hidden group-hover:flex relative z-10 bg-[rgba(0,0,0,0.7)] py-1 items-center  text-md rounded-lg ' + (isBig ? "px-2 mb-3 gap-2 justify-center" : "mb-[2px] w-full justify-around mx-[2px]")}>
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
                                        <CardNav movieUrl={slugifiedTitle} />
                                    </ul>
                                </div>
                                <div className="absolute -translate-x-1/2 left-[100%] size-0 border-[7px] border-[#8899AA] hidden group-hover:block border-l-transparent border-t-transparent border-b-transparent" />
                            </>
                        }
                    </div>
                    <span onClick={() => true /* Open Modal */} className="border-button cursor-pointer"></span>
                </div>
                {isRatingOn &&
                    <div>
                        {"★".repeat((rate + 1) / 2) + ((rate + 1) % 2 === 1 ? "½" : "")}
                    </div>
                }
            </div>
        </>
    )
}

export default MovieCard