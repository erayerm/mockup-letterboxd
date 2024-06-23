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
                <Image width={100} height={100} src={userData.photo} className="rounded-full outline outline-1 hover:outline-2 outline-offset-[-1px] hover:outline-offset-[-2px] outline-[rgba(216,224,232,0.5)]" />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4 font-bold">
                        <div className="relative group">
                            <h1 className="text-2xl group text-secondary-white">{userData.givenName}</h1>
                            <div className="absolute top-[-31px] -translate-x-1/2 left-1/2 py-1 px-2 rounded-md text-[0.7rem] bg-[#556677] hidden group-hover:block">
                                {userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}
                            </div>
                            <div className="absolute -translate-x-1/2 top-[-6px] left-1/2 size-0 border-[7px] border-[#556677] hidden group-hover:block border-l-transparent border-r-transparent border-b-transparent" />
                        </div>
                        <Link className="bg-[#556677] hover:bg-[#667888] hover:text-secondary-white text-[#C8D3E0] rounded-sm px-3 py-1.5 text-[10px] tracking-widest"
                            href="/settings/">EDIT PROFILE</Link>
                        <button className="size-5 rounded-full bg-[#394653] flex items-center justify-center"><p className="mt-[-5px] font-bold text-md">...</p></button>
                    </div>
                    <div>
                        <div className="text-[#678] hover:text-[#BBCCDD] flex items-center gap-0.5"><FontAwesomeIcon icon={faMapPin} className="size-3" /> <p>{userData.location}</p></div>
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
            <p className="text-[21px] leading-6 font-bold text-secondary-white" >{number}</p>
            <p className="text-[10px] text-[#678] group-hover:text-hover-blue">{title.toUpperCase()}</p>
        </Link>
    )
}

export default ProfileTop