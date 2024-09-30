"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_URL from "../../api/url"
import MovieCard from '@/app/components/MovieCard';
import Link from 'next/link';

function SingleFilm({ params }) {
    const { slugifiedTitle } = params;
    const [filmData, setFilmData] = useState({})
    useEffect(() => {
        if (slugifiedTitle) {
            const getFilm = async () => {
                try {
                    const response = await axios.get(`${API_URL}/films/${slugifiedTitle}/`)
                    setFilmData(response.data.movieData);
                    console.log(response.data.movieData);
                    console.log("data get successfully")
                } catch (error) {
                    console.error(error)
                }
            }
            getFilm();
        }
    }, [slugifiedTitle])
    return (
        <div className='w-full bg-[#14181C] z-[-50] relative'>
            <div className=' mt-[-75px] z-[-20] w-screen bg-[#14181C] flex justify-center'>
                <div className="relative max-w-[1200px] max-h-[520px]">
                    <img src={filmData?.movieImage} alt="example" className="w-full h-auto object-cover" />
                    {/* Üst ve alt kenar gölgeleri */}
                    <div className="absolute inset-x-0 top-0 h-[75px] bg-gradient-to-b from-[#14181C] to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#14181C] to-transparent"></div>

                    {/* Sol ve sağ kenar gölgeleri */}
                    <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-[#14181C] to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-[#14181C] to-transparent"></div>
                </div>
            </div>
            <div className='bg-[#14181C] h-[500px] relative'>
                <div className='mx-auto max-w-[950px]'>
                    {filmData.title &&
                        <>
                            <div className='w-full flex justify-between'>


                                <div className='basis-[24.21%] relative mt-[-40px]'>
                                    <MovieCard movieData={filmData} />
                                </div>
                                <div className='basis-[70.53%] mt-[-40px]'>
                                    <div className='flex leading-none items-baseline'>
                                        <h1 className='text-[#fff] text-[34px]'>{filmData.title}</h1>
                                        <Link className='text-[16px] pl-2 underline' href={"/films/year/" + filmData.date}>{filmData.date}</Link>
                                        <span className='text-[16px] pl-2'>Directed By {filmData.directors.map((item, index) => <span key={index}><span className='underline' >{item}</span><span>{index != filmData.directors.length - 1 ? ", " : ""}</span></span>)}</span>

                                    </div>

                                    <h1 className='text-[#fff]'>
                                    </h1>

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