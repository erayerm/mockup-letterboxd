"use client"

import { faBolt, faChevronDown, faMagnifyingGlass, faPlus, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import { user, userNav, nav } from "../mock/nav.js"
import Link from "next/link.js"

export default function Nav() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [stepSearchAnim, setStepSearchAnim] = useState(0);
    useEffect(() => {
        if (isSearchOpen) {
            setStepSearchAnim(1);
            setTimeout(() => setStepSearchAnim(2), 30);
        } else {
            setStepSearchAnim(0);
        }
    }, [isSearchOpen]);
    useEffect(() => {
        console.log(stepSearchAnim)
    }, [stepSearchAnim])
    const toggleSearchBox = () => {
        setIsSearchOpen((prev) => !prev)
    }
    return (
        <header className="w-screen h-[75px] bg-[#14181C]">
            <div className="container w-full h-full px-5 flex justify-between items-center font-bold tracking-[0.075em]">
                <div className="h-full text-secondary-white flex gap-3 items-center">
                    <Image width={60} height={20} src="/img/logo.png" alt="letterboxd logo" />
                    <h1 className="text-3xl">Letterboxd</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <nav>
                        <ul className="flex gap-3 items-center">
                            <li className="hover:bg-[#8899AA] relative group rounded-t-md shadow-2xl">
                                <div className="flex gap-2 px-2 py-2 group-hover:text-secondary-white items-center">
                                    <Image src={user.photo} alt="profile picture" width={24} height={24} className="rounded-full aspect-square mt-[-1px]" />
                                    <div>{user.username.toUpperCase()}</div>
                                    <div className="mt-[-1px]"><FontAwesomeIcon icon={faChevronDown} /></div>
                                </div>
                                <ul className="shadow-2xl z-20 absolute bg-inherit w-full text-[#2c3440] py-2 hidden group-hover:block group-hover:border-t border-[#7E8D9E] rounded-b-md font-light text-xs">
                                    {userNav.map((item, index) => {
                                        return <>
                                            <Link href={item.link}><li key={index} className={"hover:bg-[#667888] hover:text-secondary-white px-2 py-1 border-[#7E8D9E] " + (index === userNav.length - 3 ? "border-t" : "")}>{item.name}</li></Link>
                                        </>
                                    })}
                                </ul>
                            </li>
                            <li className="ml-[-8px]"><Link href="/activity/"><FontAwesomeIcon icon={faBolt} /></Link></li>
                            {nav.map((item, index) => <li><Link href={item.link}>{item.name.toUpperCase()}</Link></li>
                            )}
                            <li><button onClick={toggleSearchBox}>{isSearchOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}</button></li>
                        </ul>
                    </nav>
                    <div className="relative flex items-center">
                        <form className={`relative flex items-center overflow-hidden transition-all duration-500 ease-in-out rounded-full ${stepSearchAnim === 2 ? 'w-[112px]' : stepSearchAnim === 1 ? 'w-[56px]' : 'w-0'}`}
                            style={{ transition: isSearchOpen && stepSearchAnim === 2 ? 'all 500ms ease-in-out' : 'none' }}
                        >
                            <input className={`focus:bg-white focus:text-[#657B8F] bg-[#2C3540] py-2 rounded-full pl-2 ${stepSearchAnim === 2 ? 'w-[112px]' : ''}`} />
                            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isSearchOpen && stepSearchAnim === 2 ? 'opacity-100' : 'opacity-0'}`}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                    <div className={`text-secondary-white flex shadow-sm transition-all duration-500 ease-in-out ${!isSearchOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
                        style={{ transition: !isSearchOpen ? 'all 500ms ease-in-out' : 'none' }}>
                        <button className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded-l flex gap-1 items-center"><FontAwesomeIcon icon={faPlus} /><p>LOG</p></button>
                        <button className="bg-green-200 hover:bg-green-300 px-2 py-1 rounded-r"><FontAwesomeIcon icon={faChevronDown} /></button>{/*Add start a new list*/}
                    </div>
                </div>
            </div>
        </header>
    )
}