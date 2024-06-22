"use client"

import { faBolt, faChevronDown, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

const user = {
    photo: "/img/profile-picture.jpg",
    username: "determinate"
}

const userNav = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Profile",
        link: `/${user.username}/`
    },
    {
        name: "Films",
        link: `/${user.username}/films/`
    },
    {
        name: "Diary",
        link: `/${user.username}/films/diary/`
    },
    {
        name: "Reviews",
        link: `/${user.username}/films/reviews/`
    },
    {
        name: "Watchlist",
        link: `/${user.username}/watchlist/`
    },
    {
        name: "Lists",
        link: `/${user.username}/lists/`
    },
    {
        name: "Likes",
        link: `/${user.username}/likes/`
    },
    {
        name: "Tags",
        link: `/${user.username}/tags/`
    },
    {
        name: "Network",
        link: `/${user.username}/following/`
    },
    {
        name: "Settings",
        link: `/settings/`
    },
    {
        name: "Subscriptions",
        link: `/settings/subscriptions/`
    },
    {
        name: "Sign Out",
        link: `/${user.username}/#`
    }
]

const nav = [
    {
        name: "Films",
        link: `/${user.username}/films/`
    },
    {
        name: "Lists",
        link: `/${user.username}/lists/`
    },
    {
        name: "Members",
        link: `/members/`
    },
    {
        name: "Journal",
        link: `/journal/`
    },
]
export default function Nav() {


    return (
        <section className="w-full py-3 px-5 bg-[#14181C] flex justify-between items-center font-bold tracking-[0.075em]">
            <div className="h-full text-white flex gap-3 items-center">
                <Image width={60} height={20} src="/img/logo.png" alt="letterboxd logo" />
                <h1 className="text-3xl">Letterboxd</h1>
            </div>
            <div className="flex gap-5 items-center">
                <nav className="text-[#99AABB]">
                    <ul className="flex gap-4 items-center">
                        <li className="hover:bg-[#8899AA] relative group rounded-t-md shadow-2xl">
                            <div className="flex gap-2 px-2 py-2 group-hover:text-white items-center">
                                <Image src={user.photo} alt="profile picture" width={24} height={24} className="rounded-full aspect-square mt-[-1px]" />
                                <div>{user.username.toUpperCase()}</div>
                                <div className="mt-[-1px]"><FontAwesomeIcon icon={faChevronDown} /></div>
                            </div>
                            <ul className="shadow-2xl absolute bg-inherit w-full text-[#2c3440] py-2 hidden group-hover:block group-hover:border-t-[1px] border-[#7E8D9E] rounded-b-md font-light text-[12px]">
                                {userNav.map((item, index) => {
                                    return <>
                                        <a href={item.link}><li key={index} className={"hover:bg-[#667888] hover:text-white px-2 py-1 border-[#7E8D9E] " + (index === userNav.length - 3 ? "border-t-[1px]" : "")}>{item.name}</li></a>
                                    </>
                                })}
                            </ul>
                        </li>
                        <li className="ml-[-8px]"><a href="/activity/"><FontAwesomeIcon icon={faBolt} /></a></li>
                        {nav.map((item, index) => <li><a href={item.link}>{item.name.toUpperCase()}</a></li>
                        )}
                        <li><a><FontAwesomeIcon icon={faMagnifyingGlass} /></a></li>{/*Add searchbox*/}
                    </ul>
                </nav>
                <div className="text-white shadow-sm">
                    <button className="bg-[#00AC1D] px-2 py-1 rounded-l-[4px]"><FontAwesomeIcon icon={faPlus} /> LOG</button>
                    <button className="bg-[#25B931] px-2 py-1 rounded-r-[4px]"><FontAwesomeIcon icon={faChevronDown} /></button>{/*Add start a new list*/}
                </div>
            </div>
        </section>
    )
}