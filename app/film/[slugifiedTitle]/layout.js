"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_URL from "../../api/url"
import Link from 'next/link';
import FilmNavbar from '@/app/components/FilmNav';
import FilmActivityCard from '@/app/components/films/FilmActivityCard';
import FilmPageFilmCard from '@/app/components/films/FilmPageFilmCard';
import { getUsersFilmData, updateUsersFilmData } from '@/app/utils/functions';
import { useSelector } from 'react-redux';

function SingleFilm({ params, children }) {
    const { slugifiedTitle } = params;
    const [filmData, setFilmData] = useState({})
    const [isWatched, setIsWatched] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [rate, setRate] = useState(-1);
    const [isStarted, setIsStarted] = useState(false);

    const session = useSelector((state) => state.session);

    useEffect(() => {
        if (slugifiedTitle) {
            const getFilm = async () => {
                try {
                    const response = await axios.get(`${API_URL}/films/${slugifiedTitle}/`)
                    setFilmData(response.data.filmData);
                    console.log(response.data.filmData);
                    console.log("data get successfully")
                } catch (error) {
                    console.error(error)
                }
            }
            getFilm();
        }
    }, [slugifiedTitle])

    useEffect(() => {
        if (session) {
            try {
                (async () => {
                    const res = await getUsersFilmData(session.user.username, slugifiedTitle);
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
    }, [session])

    useEffect(() => {
        try {
            if (isStarted)
                (async () => {
                    await updateUsersFilmData(session.user.username, {
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
                    await updateUsersFilmData(session.user.username, {
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
        <div className='w-full bg-[#14181C] z-[-50] relative'>
            <div className=' mt-[-75px] z-[-20] w-screen bg-[#14181C] flex justify-center'>
                <div className="relative max-w-[1200px] max-h-[520px]">
                    <img src={filmData?.filmImage} alt="example" className="w-full h-auto object-cover" />
                    <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#14181C] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#14181C] to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-[#14181C] to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-[#14181C] to-transparent" />
                </div>
            </div>
            <div className='bg-[#14181C] h-[500px] relative'>
                <div className='mx-auto max-w-[950px]'>
                    {filmData.title &&
                        <>
                            <div className='w-full flex justify-between'>
                                <div className='basis-[24.21%] relative mt-[-40px]'>
                                    <FilmPageFilmCard filmData={filmData}
                                        isWatched={isWatched}
                                        setIsWatched={setIsWatched}
                                        isLiked={isLiked}
                                        setIsLiked={setIsLiked}
                                        isWatchlisted={isWatchlisted}
                                        setIsWatchlisted={setIsWatchlisted}
                                        rate={rate}
                                        setRate={setRate}
                                        isStarted={isStarted}
                                        setIsStarted={setIsStarted}
                                    />
                                </div>
                                <div className='basis-[70.53%] mt-[-40px]'>
                                    <div className='flex leading-none items-baseline'>
                                        <h1 className='text-[#fff] text-[34px]'>{filmData.title}</h1>
                                        <Link className='text-[16px] pl-2 underline text-gray-300' href={"/films/year/" + filmData.date}>{filmData.date}</Link>
                                        <span className='text-[16px] pl-2'>Directed By {filmData.directors.map((item, index) => <span key={index}><span className='underline cursor-pointer text-gray-300' >{item}</span><span>{index != filmData.directors.length - 1 ? ", " : ""}</span></span>)}</span>
                                    </div>
                                    <div className='flex justify-between pt-10'>
                                        <div className='basis-[58.21%] text-[#9ab]'>{/*left of the right */}
                                            <h2 className='pb-5'>
                                                {filmData.tagline.toUpperCase()}
                                            </h2>
                                            <p className='text-[16px]'>{filmData.description}</p>
                                            <FilmNavbar />
                                            {children}
                                        </div>
                                        <div className='basis-[34.32%] '>{/*right of the right */}
                                            <FilmActivityCard
                                                isWatched={isWatched}
                                                setIsWatched={setIsWatched}
                                                isLiked={isLiked}
                                                setIsLiked={setIsLiked}
                                                isWatchlisted={isWatchlisted}
                                                setIsWatchlisted={setIsWatchlisted}
                                                rate={rate}
                                                setRate={setRate}
                                                isStarted={isStarted}
                                                setIsStarted={setIsStarted}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>

        </div>
    )
}

export default SingleFilm