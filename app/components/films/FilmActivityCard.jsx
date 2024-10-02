import { faCopy, faEye, faHeart, faStopwatch, faX } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import LeftStar from "@/public/img/left-star.svg"
import RightStar from "@/public/img/right-star.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import API_URL from "@/app/api/url";

function FilmActivityCard() {
    const [isWatched, setIsWatched] = useState(true);
    const [isFavorited, setIsFavorited] = useState(true);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [watchHover, setWatchHover] = useState(false);
    const [favoriteHover, setFavoriteHover] = useState(false);
    const [watchlistHover, setWatchlistHover] = useState(false);
    const [rating, setRating] = useState(-1);
    const [isStarted, setIsStarted] = useState(false);

    const pathname = usePathname()
    const pathArr = pathname.split("/");
    const basePath = "/" + pathArr[1] + "/" + pathArr[2] + "/"
    const session = useSelector((state) => state.session);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const link = "www.letterboxd.coms"

    const toggleIsWatched = () => {
        setIsWatched((prev) => !prev);
    }
    const toggleIsFavorited = () => {
        setIsFavorited((prev) => !prev);
    }
    const toggleIsWatchlisted = () => {
        setIsWatchlisted((prev) => !prev);
    }

    const handleWatchRemove = () => {
        setWatchHover((prev) => !prev);
    }
    const handleLikeRemove = () => {
        setFavoriteHover((prev) => !prev);
    }
    const handleWatchlistRemove = () => {
        setWatchlistHover((prev) => !prev);
    }

    const shareRef = useRef(null)
    const handleMouseEnterShare = () => {
        if (shareRef.current) {
            clearTimeout(shareRef.current)
        }
        setIsShareOpen(true)
    }
    const handleMouseLeaveShare = () => {
        shareRef.current = setTimeout(() => {
            setIsShareOpen(false)
        }, 1000)
    }

    useEffect(() => {
        const getRating = async () => {

            const response = await axios.get(`${API_URL}/users/${"determinate"}/films?slugifiedTitle=${pathArr[2]}`);
            setRating(response.data.rate);
        }
        getRating()
        setIsStarted(true);
    }, [])

    useEffect(() => {
        const updateRating = async () => {
            const response = await axios.put(`${API_URL}/users/${"determinate"}/films`,
                {
                    slugifiedTitle: pathArr[2],
                    rate: (rating)
                }
            )
        }
        try {
            if (isStarted && rating) {
                updateRating();
            }
        } catch (error) {
            console.error(error);
        }
    }, [rating])
    return (
        <div className="w-full max-w-[230px] rounded-sm text-[#bcd]">
            <ul className="space-y-[1px] film-activity-card-ul">
                <li>
                    <div className="flex justify-around">
                        <div onMouseEnter={handleWatchRemove} onMouseLeave={handleWatchRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsWatched}><FontAwesomeIcon className={isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                            <p>{isWatched ? watchHover ? "Remove" : "Watched" : "Watch"}</p>
                        </div>
                        <div onMouseEnter={handleLikeRemove} onMouseLeave={handleLikeRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsFavorited}><FontAwesomeIcon className={isFavorited ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                            <p>{isFavorited ? favoriteHover ? "Remove" : "Liked" : "Like"}</p>
                        </div>
                        <div onMouseEnter={handleWatchlistRemove} onMouseLeave={handleWatchlistRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsWatchlisted}><FontAwesomeIcon className={isWatchlisted ? 'text-[#41BCF4]' : ""} icon={faStopwatch} /></button>
                            <p>{isWatchlisted ? watchlistHover ? "Remove" : "Watchlist" : "Watchlist"}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center gap-1">
                        <p>Rated</p>
                        <div><FiveStar greenStars={rating} setGreenStars={setRating} /></div>
                    </div>
                </li>
                <li>
                    <Link href={"/" + session?.user.username + basePath + "activity"}>Show your activity</Link>
                </li>
                <li>
                    <button onClick={() => true/* modal for review */}>Review or log{/* again? */}...</button>
                </li>
                <li>
                    <button onClick={() => true/* modal for lists */}>Add to lists...</button>
                </li>
                <li>
                    <p>Go <Link href={"#"} className="mx-1 text-[12px] bg-blue-500 px-[7px] py-[1px] rounded-sm text-[#fff]">PATRON</Link> to change images</p>
                </li>
                <li onMouseEnter={handleMouseEnterShare}
                    onMouseLeave={handleMouseLeaveShare} >
                    {
                        isShareOpen
                            ? <div className="flex items-center justify-center gap-2">
                                <div className="flex max-w-[60%]">
                                    <p className="bg-[#2D3440] truncate">{link}</p>
                                    <button onClick={() => navigator.clipboard.writeText(link)} className="border border-[#2D3440] px-1"><FontAwesomeIcon icon={faCopy} /></button>
                                </div>
                                <a target="_blank" href={"https://twitter.com/intent/tweet?text=movie: " + pathArr[2] + " link: letterboxd.com" + pathname}><FontAwesomeIcon className="text-[18px]" icon={faTwitter} /></a>
                                <a target="_blank" href={"https://twitter.com/intent/tweet?text=" + pathArr[2]}><FontAwesomeIcon className="text-[18px]" icon={faFacebook} /></a>
                            </div>
                            : <p>Share</p>
                    }
                </li>
            </ul>
        </div>
    )
}

const FiveStar = ({ greenStars, setGreenStars }) => {
    const array = Array(10).fill(0);
    const [blueStars, setBlueStars] = useState(-1);
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
        <FontAwesomeIcon icon={faX} className={"size-[13px] text-[#8D97A0] cursor-pointer absolute top-[14.5px] left-[-3px] transform -translate-x-1/2 -translate-y-1/2 " + (greenStars != -1 && isRemoveOpen ? "block" : "hidden")} onClick={handleRemoveRating} />
        <div className='flex gap-0 px-[7px]'>
            {array.map((i, index) => {
                const StarComponent = index % 2 === 0 ? LeftStar : RightStar;
                return (
                    <StarComponent
                        key={index}
                        className='w-[16px] h-[30px]'
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

export default FilmActivityCard