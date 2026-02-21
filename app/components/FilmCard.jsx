"use client";

import { faEllipsis, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersFilmData,
  titleSlugifier,
  updateUsersFilmData,
} from "@/utils/functions";
import CardNav from "./CardNav.jsx";
import FiveStar from "./FiveStar";
import { setFilmData, updateFilmData } from "@/lib/features/film/filmSlice.js";
import { useRouter } from "next/navigation.js";

function FilmCard({ filmData, isBig, isRatingOn }) {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slugifiedTitle = titleSlugifier(filmData.title);
  const filmStateNotSafe = useSelector((state) => state.film[slugifiedTitle]);
  const filmState = filmStateNotSafe ?? {};

  const router = useRouter();

  useEffect(() => {
    if (session && !filmState.isLoaded) {
      try {
        (async () => {
          const res = await getUsersFilmData(
            session.user.username,
            slugifiedTitle,
          );
          dispatch(
            setFilmData({
              slugifiedTitle,
              data: {
                rate: res.data.rate,
                isWatched: res.data.watchedTimes > 0,
                isLiked: res.data.isLiked,
                isWatchlisted: res.data.isWatchlisted,
                isLoaded: true,
              },
            }),
          );
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [session, filmState.isLoaded]);

  useEffect(() => {
    if (filmState.isLoaded) {
      try {
        (async () => {
          await updateUsersFilmData(session.user.username, {
            slugifiedTitle,
            rate: filmState.rate,
            isWatched: filmState.isWatched,
            isLiked: filmState.isLiked,
            isWatchlisted: filmState.isWatchlisted,
          });
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    filmState.isLoaded,
    filmState.rate,
    filmState.isLiked,
    filmState.isWatchlisted,
    filmState.isWatched,
  ]);

  const toggleIsWatched = () => {
    if (filmState.rate > -1 && filmState.isWatched) return;
    dispatch(
      updateFilmData({
        slugifiedTitle,
        updates: { isWatched: !filmState.isWatched },
      }),
    );
  };

  const toggleIsLiked = () => {
    dispatch(
      updateFilmData({
        slugifiedTitle,
        updates: { isLiked: !filmState.isLiked },
      }),
    );
  };

  const toggleIsMenuOpen = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="basis-[155px]">
        <div
          className={
            (filmState.isWatched ? "film-card" : "film-card-white") +
            " group relative flex items-end justify-center shadow-custom-inset w-full aspect-[150/225] bg-cover rounded-md"
          }
          style={{ backgroundImage: `url(${filmData.poster})` }}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div
            className={
              "hidden group-hover:flex relative z-10 bg-[rgba(0,0,0,0.7)] py-1 items-center text-md rounded-lg " +
              (isBig
                ? "px-2 mb-3 gap-2 justify-center"
                : "mb-[2px] w-full justify-around mx-[2px]")
            }
          >
            <button onClick={toggleIsWatched}>
              <FontAwesomeIcon
                className={filmState.isWatched ? "text-green-400" : ""}
                icon={faEye}
              />
            </button>
            <button onClick={toggleIsLiked}>
              <FontAwesomeIcon
                className={filmState.isLiked ? "text-[#FF9111]" : ""}
                icon={faHeart}
              />
            </button>
            <button onClick={toggleIsMenuOpen}>
              <FontAwesomeIcon className="text-lg" icon={faEllipsis} />
            </button>
            {isMenuOpen && (
              <>
                <div className="absolute z-[50] bottom-[-100%] left-[108%] bg-[#8899AA] text-[#2c3440] rounded-md shadow-lg">
                  <ul>
                    <li className="p-2 text-center w-full flex justify-center">
                      <FiveStar
                        greenStars={filmState.rate}
                        setGreenStars={(newRate) => {
                          dispatch(
                            updateFilmData({
                              slugifiedTitle,
                              updates:
                                newRate > -1
                                  ? { rate: newRate, isWatched: true }
                                  : { rate: newRate },
                            }),
                          );
                        }}
                      />
                    </li>
                    <CardNav filmUrl={slugifiedTitle} />
                  </ul>
                </div>
                <div className="absolute -translate-x-1/2 left-[100%] size-0 border-[7px] border-[#8899AA] hidden group-hover:block border-l-transparent border-t-transparent border-b-transparent" />
              </>
            )}
          </div>
          <span
            onClick={() => router.push("/film/" + slugifiedTitle)}
            className="border-button cursor-pointer"
          ></span>
        </div>
        {isRatingOn && (
          <div>
            {"★".repeat((filmState.rate + 1) / 2) +
              ((filmState.rate + 1) % 2 === 1 ? "½" : "")}
          </div>
        )}
      </div>
    </>
  );
}

export default FilmCard;
