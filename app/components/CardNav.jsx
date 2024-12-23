import Link from 'next/link';
import { user } from "../mock/user.js"

//TODO: watchlisted
export default function CardNav({ slugifiedTitle, isWatchlisted, setIsWatchlisted }) {
    const filmCardNav = [
        {
            name: "Show your activity",
            link: `/${user.username}/film/${slugifiedTitle}/activity/`
        },
        {
            name: "Log or review film...",
            link: `/${user.username}//#`
        },
        {
            name: "Add to watchlist",
            link: `/${user.username}//#`
        },
        {
            name: "Add to lists...",
            link: `/${user.username}//#`
        },
        {
            name: "Show in lists",
            link: `/film/${slugifiedTitle}/lists/by/popular`
        },
        {
            name: "Where to watch",
            link: `/film/${slugifiedTitle}/watch/`
        },
    ]

    return (
        <>
            {filmCardNav.map((item, index) => {
                return <li key={index} className='border-[#7E8D9E] text-[#2c3440] hover:bg-[#667788] hover:text-white border-t px-2 w-[180px] text-center py-1'><Link href={item.link} className=''>{item.name}</Link></li>
            })
            }
        </>
    )
}