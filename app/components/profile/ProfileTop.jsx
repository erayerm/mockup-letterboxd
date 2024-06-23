'use client'

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

function ProfileTop({ userData }) {
    return (
        <div className="flex justify-between items-center py-[30px]">
            <div className="flex items-center gap-4">
                <Image width={100} height={100} src={userData.photo} className="rounded-full" />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4 font-bold">
                        <h1 className="text-[24px] ">{userData.givenName}</h1>
                        <Link className="bg-[#556677] rounded-sm px-3 py-1.5 text-[10px] tracking-widest"
                            href="/settings/">EDIT PROFILE</Link>
                        <button className="size-[20px] rounded-full bg-[#394653] flex items-center justify-center"><p className="mt-[-5px] font-bold text-md">...</p></button>
                    </div>
                    <div>
                        <p className="text-[#678]"><FontAwesomeIcon icon={faMapPin} /> {userData.location}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex">
                    {numberAndTitles.map((item, index) => {
                        return (
                            <>
                                <NumberOf key={index} index={index} number={item.number} title={item.title} />
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
    { number: 293, title: "films" },
    { number: 47, title: "this year" },
    { number: 2, title: "lists" },
    { number: 2, title: "following" },
    { number: 1, title: "follower" },
]

function NumberOf({ index, number, title }) {
    return (
        <div className={"flex flex-col items-center px-3" + (index !== numberAndTitles.length - 1 ? " border-r-[1px] border-r-[rgba(136,153,170,0.1)]" : "")}>
            <p className="text-[21px] leading-6 font-bold" >{number}</p>
            <p className="text-[10px] text-[#678]">{title.toUpperCase()}</p>
        </div>
    )
}

export default ProfileTop