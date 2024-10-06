import { faCopy, faEye, faHeart, faStopwatch, faX } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import LeftStar from "@/public/img/left-star.svg"
import RightStar from "@/public/img/right-star.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFilmData, updateUsersFilmData } from "@/app/utils/functions";
import { setFilmData, updateFilmData } from '@/lib/features/film/filmSlice.js';
import FiveStar from "../FiveStar";

function FilmActivityCard() {
    const session = useSelector((state) => state.session);
    const pathname = usePathname()
    const slugifiedTitle = pathname.split("/")[2];
    const basePath = "/film/" + slugifiedTitle + "/"
    const link = "www.letterboxd.coms"
    const dispatch = useDispatch();

    const [watchHover, setWatchHover] = useState(false);
    const [favoriteHover, setFavoriteHover] = useState(false);
    const [watchlistHover, setWatchlistHover] = useState(false);
    const handleWatchRemove = () => setWatchHover(prev => !prev);
    const handleLikeRemove = () => setFavoriteHover(prev => !prev);
    const handleWatchlistRemove = () => setWatchlistHover(prev => !prev);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareRef = useRef(null)
    const handleMouseLeaveShare = () => shareRef.current = setTimeout(() => setIsShareOpen(false), 1000)
    const handleMouseEnterShare = () => {
        if (shareRef.current) clearTimeout(shareRef.current);
        setIsShareOpen(true)
    }

    const filmState = useSelector((state) => state.film[slugifiedTitle] || {});

    useEffect(() => {
        if (filmState.isLoaded) {
            try {
                (async () => {
                    await updateUsersFilmData(session.user.username, {
                        slugifiedTitle,
                        rate: filmState.rate,
                        isWatched: filmState.isWatched,
                        isLiked: filmState.isLiked,
                        isWatchlisted: filmState.isWatchlisted
                    });
                })();
            } catch (error) {
                console.error(error);
            }
        }
    }, [filmState.isLoaded, filmState.rate, filmState.isLiked, filmState.isWatchlisted, filmState.isWatched]);

    const toggleIsWatched = () => {
        if (filmState.rate > -1 && filmState.isWatched) return;
        dispatch(updateFilmData({
            slugifiedTitle,
            updates: { isWatched: !filmState.isWatched }
        }));
    };

    const toggleIsLiked = () => {
        dispatch(updateFilmData({
            slugifiedTitle,
            updates: { isLiked: !filmState.isLiked }
        }));
    };

    const toggleIsWatchlisted = () => {
        dispatch(updateFilmData({
            slugifiedTitle,
            updates: { isWatchlisted: !filmState.isWatchlisted }
        }));
    }

    useEffect(() => {
        if (session && !filmState.isLoaded) {
            try {
                (async () => {
                    const res = await getUsersFilmData(session.user.username, slugifiedTitle);
                    dispatch(setFilmData({
                        slugifiedTitle,
                        data: {
                            rate: res.data.rate,
                            isWatched: res.data.watchedTimes > 0,
                            isLiked: res.data.isLiked,
                            isWatchlisted: res.data.isWatchlisted,
                            isLoaded: true
                        }
                    }));
                })();
            } catch (error) {
                console.error(error);
            }
        }
    }, [session, filmState.isLoaded]);

    return (
        <div className="w-full max-w-[230px] rounded-sm text-[#bcd]">
            <ul className="space-y-[1px] film-activity-card-ul">
                <li>
                    <div className="flex justify-around">
                        <div onMouseEnter={handleWatchRemove} onMouseLeave={handleWatchRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsWatched}><FontAwesomeIcon className={filmState.isWatched ? 'text-green-400' : ""} icon={faEye} /></button>
                            <p>{filmState.isWatched ? watchHover ? "Remove" : "Watched" : "Watch"}</p>
                        </div>
                        <div onMouseEnter={handleLikeRemove} onMouseLeave={handleLikeRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsLiked}><FontAwesomeIcon className={filmState.isLiked ? 'text-[#FF9111]' : ""} icon={faHeart} /></button>
                            <p>{filmState.isLiked ? favoriteHover ? "Remove" : "Liked" : "Like"}</p>
                        </div>
                        <div onMouseEnter={handleWatchlistRemove} onMouseLeave={handleWatchlistRemove} className="basis-[33%] text-center flex flex-col">
                            <button className="text-[32px]" onClick={toggleIsWatchlisted}><FontAwesomeIcon className={filmState.isWatchlisted ? 'text-[#41BCF4]' : ""} icon={faStopwatch} /></button>
                            <p>{filmState.isWatchlisted ? watchlistHover ? "Remove" : "Watchlist" : "Watchlist"}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center gap-1">
                        <p>Rated</p>
                        <div>
                            <FiveStar
                                greenStars={filmState.rate}
                                isBig={true}
                                setGreenStars={(newRate) => {
                                    dispatch(updateFilmData({
                                        slugifiedTitle,
                                        updates: newRate > -1 ? { rate: newRate, isWatched: true } : { rate: newRate }
                                    }))
                                }} />
                        </div>
                    </div>
                </li>
                <li>
                    <Link href={"/" + session?.user.username + basePath + "activity"}>Show your activity</Link>
                </li>
                <li>
                    <button onClick={() => true/* TODO:modal for review */}>Review or log{/* TODO:again? */}...</button>
                </li>
                <li>
                    <button onClick={() => true/* TODO:modal for lists */}>Add to lists...</button>
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
                                <a target="_blank" href={"https://twitter.com/intent/tweet?text=film: " + slugifiedTitle + " link: letterboxd.com" + pathname}><FontAwesomeIcon className="text-[18px]" icon={faTwitter} /></a>
                                <a target="_blank" href={"https://twitter.com/intent/tweet?text=" + slugifiedTitle}><FontAwesomeIcon className="text-[18px]" icon={faFacebook} /></a>
                            </div>
                            : <p>Share</p>
                    }
                </li>
            </ul>
        </div>
    )
}

export default FilmActivityCard