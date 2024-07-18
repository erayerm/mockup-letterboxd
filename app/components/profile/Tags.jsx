import Link from "next/link"
import { user } from "../../mock/user.js"
import { tags } from "../../mock/tags.js"

function Tags() {
    return (
        <div className="md:basis-[45%] basis-full">
            <div className="flex justify-between w-full border-b pb-1 mb-2 border-b-[rgba(136,153,170,0.5)]">
                <Link href={`/${user.username}/tags/`} className="hover:text-hover-blue">TAGS</Link>
                <Link href={`/${user.username}/tags/`} className="text-[11px] text-[#678] hover:text-hover-blue">{tags.length}</Link>{/*TODO: dynamic tag count*/}
            </div>
            <div className="flex gap-x-5 gap-y-2 flex-wrap">
                {tags.map((item, index) => {
                    return <Link href={`/${user.username}/tag/${item.toLowerCase()}/films/`} className="relative group">
                        <p className="relative block bg-[#556677] group-hover:bg-[#667888] cursor-pointer hover:text-secondary-white text-[#C8D3E0] px-2 py-1">
                            {item}
                        </p>
                        <div className="absolute -translate-x-1/2 top-0 bottom-0 size-0 right-[-42px] border-[14px] border-[#556677] group-hover:border-l-[#667888] block border-r-transparent border-t-transparent border-b-transparent" />
                    </Link>
                })}
            </div>
        </div>
    )
}

export default Tags