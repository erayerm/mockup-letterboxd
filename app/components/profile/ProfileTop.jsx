'use client'

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { user } from "../../mock/user.js"

function ProfileTop({ userData }) {

    return (
        <div className="flex justify-between items-center py-[30px]">
            <div className="flex items-center gap-4">
                <Image width={100} height={100} src={userData.photo} className="rounded-full hover:outline outline-1 outline-offset-[-1px] hover:outline-white" />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4 font-bold">
                        <div className="relative group">
                            <h1 className="text-[24px] group">{userData.givenName}</h1>
                            <div className="absolute top-[-31px] -translate-x-1/2 left-[50%] py-1 px-2 rounded-md text-[0.7rem] bg-[#556677] hidden group-hover:block">
                                {userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}
                            </div>
                            <div className="absolute -translate-x-1/2 top-[-6px] left-[50%] size-0 border-[7px] border-[#556677] hidden group-hover:block border-l-transparent border-r-transparent border-b-transparent" />
                        </div>
                        <Link className="bg-[#556677] hover:bg-[#667888] hover:text-white rounded-sm px-3 py-1.5 text-[10px] tracking-widest"
                            href="/settings/">EDIT PROFILE</Link>
                        <button className="size-[20px] rounded-full bg-[#394653] flex items-center justify-center"><p className="mt-[-5px] font-bold text-md">...</p></button>
                    </div>
                    <div>
                        <p className="text-[#678] hover:text-[#BBCCDD]"><FontAwesomeIcon icon={faMapPin} /> {userData.location}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex">
                    {numberAndTitles.map((item, index) => {
                        return (
                            <>
                                <NumberOf key={index} index={index} number={item.number} title={item.title} link={item.link} />
                            </>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

const numberAndTitles = [
    { number: 293, title: "films", link: `${user.username}/films/` },
    { number: 47, title: "this year", link: `${user.username}/films/diary/for/${new Date().getFullYear()}/` },
    { number: 2, title: "lists", link: `${user.username}/lists/` },
    { number: 2, title: "following", link: `${user.username}/following/` },
    { number: 1, title: "follower", link: `${user.username}/followers/` },
]

function NumberOf({ index, number, title, link }) {
    return (
        <Link href={link} className={"flex flex-col items-center px-3 group" + (index !== numberAndTitles.length - 1 ? " border-r-[1px] border-r-[rgba(136,153,170,0.1)]" : "")}>
            <p className="text-[21px] leading-6 font-bold" >{number}</p>
            <p className="text-[10px] text-[#678] group-hover:text-[#3AA6D9]">{title.toUpperCase()}</p>
        </Link>
    )
}

export default ProfileTop