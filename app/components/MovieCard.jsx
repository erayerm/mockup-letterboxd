"use client"

import { faEllipsis, faEye, faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CardNav from './CardNav.jsx';
import LeftStar from "../../public/img/left-star.svg"
import RightStar from "../../public/img/right-star.svg"

function MovieCard({ movieData }) {
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
            <div className='w-full'>
                <div className={"group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"}
                    style={{ backgroundImage: `url(${movieData.poster})` }}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className='hidden group-hover:flex relative z-[10] gap-2 bg-[rgba(0,0,0,0.7)] px-2 py-1 mb-3 items-center justify-center text-md rounded-lg'>
                        <button onClick={toggleIsWatched}><FontAwesomeIcon className={isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                        <button onClick={toggleIsFavorited}><FontAwesomeIcon className={isFavorited ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                        <button onClick={toggleIsMenuOpen}><FontAwesomeIcon className='text-lg' icon={faEllipsis} /></button>
                        {isMenuOpen &&
                            <>
                                <div className='absolute z-[50] bottom-[-100%] left-[108%] bg-[#8899AA] text-[#2c3440] rounded-md shadow-lg'>
                                    <ul>
                                        <li className='p-2 text-center w-full flex justify-center'>
                                            <FiveStar />
                                        </li>
                                        <CardNav movieUrl={movieUrl} />
                                    </ul>
                                </div>
                                <div className="absolute -translate-x-1/2 left-[100%] size-0 border-[7px] border-[#8899AA] hidden group-hover:block border-l-transparent border-t-transparent border-b-transparent" />
                            </>
                        }
                    </div>
                    <span onClick={() => true /* Open Modal */} className="border-button cursor-pointer"></span>
                </div>
            </div>
        </>
    )
}

const FiveStar = () => {
    const array = Array(10).fill(0);
    const [blueStars, setBlueStars] = useState(-1);
    const [greenStars, setGreenStars] = useState(-1);
    const [isClicked, setIsClicked] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const handleMouseEnter = async (index) => {
        setBlueStars(index)
    };
    const handleMouseLeave = () => {
        setIsClicked(false);
        setBlueStars(-1);
    };
    const handleClick = (index) => {
        setGreenStars(index);
        setIsClicked(true);
    };
    const handleRemoveRating = () => {
        setGreenStars(-1);
    }

    return (<div className={'relative'} onMouseEnter={() => setIsRemoveOpen(true)} onMouseLeave={() => setIsRemoveOpen(false)}>
        <FontAwesomeIcon icon={faX} className={"size-[10px] text-[#324554] cursor-pointer absolute top-[11.5px] left-0 transform -translate-x-1/2 -translate-y-1/2 " + (greenStars != -1 && isRemoveOpen ? "block" : "hidden")} onClick={handleRemoveRating} />
        <div className='flex gap-0 px-[7px]'>
            {array.map((i, index) => {
                const StarComponent = index % 2 === 0 ? LeftStar : RightStar;
                return (
                    <StarComponent
                        key={index}
                        className='w-[12px] h-[22.5px]'
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onClick={() => handleClick(index)}
                        data-name={index}
                        fill={
                            isClicked
                                ? greenStars >= index
                                    ? "#00E054"//green
                                    : "#324554"//empty
                                : blueStars >= index
                                    ? "#41BCF4"//blue
                                    : blueStars == -1
                                        ? greenStars >= index
                                            ? "#00E054"//green
                                            : "#324554"//empty
                                        : "#324554"//empty
                        }
                    />
                )
            })}
        </div>
    </div>
    );
};

export default MovieCard