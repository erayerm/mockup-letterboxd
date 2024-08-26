import Link from "next/link"
import { user } from "../../mock/user.js"
import { allUsers } from "../../mock/user.js"

function Following() {
    return (
        <div className="md:basis-[45%] basis-full">
            <div className="flex justify-between w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">
                <Link href={`/${user.username}/following/`} className="hover:text-hover-blue">FOLLOWING</Link>
                <Link href={`/${user.username}/following/`} className="text-[11px] text-[#678] hover:text-hover-blue">{allUsers.length}</Link>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
                {allUsers.map((item, index) => {
                    return <div key={index} className="group relative size-10 rounded-full">
                        <Link href={`/${item.username}/`}>
                            <img src={item.photo} className="rounded-full size-10 outline outline-1 hover:outline-2 outline-offset-[-1px] hover:outline-offset-[-2px] outline-[rgba(216,224,232,0.5)]" />
                        </Link>
                        <div className="absolute top-[-31px] -translate-x-1/2 left-1/2 py-1 px-2 rounded-md text-[0.7rem] bg-[#556677] hidden group-hover:block">
                            {item.username}
                        </div>
                        <div className="absolute -translate-x-1/2 top-[-7px] left-1/2 size-0 border-[7px] border-[#556677] hidden group-hover:block border-l-transparent border-r-transparent border-b-transparent" />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Following