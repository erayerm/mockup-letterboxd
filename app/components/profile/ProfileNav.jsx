import Link from "next/link.js"
import { profileNav } from "../../mock/nav.js"
import { faRss } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function ProfileNav({ username }) {
    return (
        <div className="container pb-[30px]">
            <div className="border border-[rgba(136,153,170,0.1)] flex w-full justify-center items-center">
                <div className="flex justify-center gap-5 w-full ">
                    {profileNav.map((item, index) => <Link href={item.link} key={index} className={"h-full py-3 text-[15px] " + (index == 0 ? "border_container text-secondary-white" : "hover:text-hover-blue")}>{item.name}</Link>)}
                </div>
                <Link href="/" className="px-2"><FontAwesomeIcon icon={faRss} /></Link>
            </div>
        </div>
    )
}

export default ProfileNav