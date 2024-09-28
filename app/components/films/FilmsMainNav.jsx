"use client"

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef, useState } from "react";

function FilmsMainNav() {
    return (
        <div className="flex items-center text-gray-500 text-[13px] gap-5">
            <p>BROWSE BY</p>
            <ul className="flex">
                {items.map((item, index) => {
                    return <NavItem key={index} index={index} maxItem={items.length} title={item.title} subItems={item.subItems} />
                })}
            </ul>
        </div>
    )
}

const NavItem = ({ title, subItems, index, maxItem }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuCloseTimeout = useRef(null);

    const handleMouseEnter = () => {
        menuCloseTimeout.current = setTimeout(() => {
            setIsMenuOpen(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (menuCloseTimeout.current) {
            clearTimeout(menuCloseTimeout.current);
        }
        setIsMenuOpen(false);
    };

    return (
        <li className={"relative group " + (isMenuOpen ? "bg-[#8899AA] " : "")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={"flex gap-1 px-2 py-1 border-[0.5px] border-gray-600 items-center " + (isMenuOpen ? "text-secondary-white " : "") + (index === 0 ? "rounded-l-md " : "") + (index === maxItem - 1 ? "rounded-r-md" : "")}>
                {title?.toUpperCase()}
                <div className="mt-[-1px] text-[8px]"><FontAwesomeIcon icon={faChevronDown} /></div>
            </div>
            {isMenuOpen &&
                <ul
                    className="shadow-2xl z-20 absolute bg-inherit min-w-full text-[#2c3440] py-1 border-t border-[#7E8D9E] rounded-b-md font-light text-xs">
                    {subItems.map((item, index) => <Link key={index} href={item.link}>
                        <li className={"whitespace-nowrap hover:bg-[#667888] hover:text-secondary-white px-2 py-[0.5px] border-[#7E8D9E]"}>
                            {item.title}
                        </li>
                    </Link>
                    )}
                </ul>
            }
        </li>
    )
}

const items = [
    {
        title: "Year",
        subItems: [
            { title: "All", link: "/films/all/" },
            { title: "Upcoming", link: "/films/upcoming/" },
            { title: "2020s", link: "/films/decade/2020s/" },
            { title: "2010s", link: "/films/decade/2010s/" },
            { title: "2000s", link: "/films/decade/2000s/" },
            { title: "1990s", link: "/films/decade/1990s/" },
            { title: "1980s", link: "/films/decade/1980s/" },
            { title: "1970s", link: "/films/decade/1970s/" },
            { title: "1960s", link: "/films/decade/1960s/" },
            { title: "1950s", link: "/films/decade/1950s/" },
            { title: "1940s", link: "/films/decade/1940s/" },
            { title: "1930s", link: "/films/decade/1930s/" },
            { title: "1920s", link: "/films/decade/1920s/" },
            { title: "1910s", link: "/films/decade/1910s/" },
            { title: "1900s", link: "/films/decade/1900s/" },
            { title: "1890s", link: "/films/decade/1890s/" },
            { title: "1880s", link: "/films/decade/1880s/" },
            { title: "1870s", link: "/films/decade/1870s/" }
        ]
    },
    {
        title: "Rating",
        subItems: [
            { title: "Highest First", link: "/films/by/rating/" },
            { title: "Lowest First", link: "/films/by/rating-lowest/" },
            { title: "Top 250 Narrative Features", link: "#" },
            { title: "Top 250 Documentaries", link: "#" }
        ]
    },
    {
        title: "Popular",
        subItems: [
            { title: "All Time", link: "/films/popular/" },
            { title: "This Year", link: "/films/popular/this/year/" },
            { title: "This Month", link: "/films/popular/this/month/" },
            { title: "This Week", link: "/films/popular/this/week/" }
        ]
    },
    {
        title: "Genre",
        subItems: [
            { title: "Action", link: "/films/genre/action/" },
            { title: "Adventure", link: "/films/genre/adventure/" },
            { title: "Animation", link: "/films/genre/animation/" },
            { title: "Comedy", link: "/films/genre/comedy/" },
            { title: "Crime", link: "/films/genre/crime/" },
            { title: "Documentary", link: "/films/genre/documentary/" },
            { title: "Drama", link: "/films/genre/drama/" },
            { title: "Family", link: "/films/genre/family/" },
            { title: "Fantasy", link: "/films/genre/fantasy/" },
            { title: "History", link: "/films/genre/history/" },
            { title: "Horror", link: "/films/genre/horror/" },
            { title: "Music", link: "/films/genre/music/" },
            { title: "Mystery", link: "/films/genre/mystery/" },
            { title: "Romance", link: "/films/genre/romance/" },
            { title: "Science Fiction", link: "/films/genre/science-fiction/" },
            { title: "Thriller", link: "/films/genre/thriller/" },
            { title: "TV Movie", link: "/films/genre/tv-movie/" },
            { title: "War", link: "/films/genre/war/" },
            { title: "Western", link: "/films/genre/western/" }
        ]
    },
    {
        title: "Service",
        subItems: [
            { title: "Any Favorite Service", link: "#" },
            { title: "Amazon US", link: "#" },
            { title: "Amazon Video US", link: "#" },
            { title: "Apple TV Plus US", link: "#" },
            { title: "Apple TV TR", link: "#" }
        ]
    },
    {
        title: "Other",
        subItems: [
            { title: "Most Anticipated", link: "#" },
            { title: "Opening Soon (US)", link: "#" },
            { title: "Film Name (A-Z)", link: "#" },
            { title: "Collections", link: "#" },
            { title: "Countries / Languages", link: "#" }
        ]
    }
]

export default FilmsMainNav