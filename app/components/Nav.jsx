"use client"

import { faBolt, faChevronDown, faMagnifyingGlass, faPlus, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { user, userNav, nav } from "../mock/nav.js"
import Link from "next/link.js"
import RegisterModal from "./RegisterModal.jsx"
import SignInForm from "./SignInForm.jsx"
import { signOut, useSession } from "next-auth/react"
import { useSelector } from "react-redux"
import { usePathname } from "next/navigation"

export default function Nav() {
    const session = useSelector((state) => state.session);
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [stepSearchAnim, setStepSearchAnim] = useState(0);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const pathname = usePathname();
    const [isTransparent, setIsTransparent] = useState(false);

    useEffect(() => {
        if (pathname.startsWith('/film/') && pathname !== '/film') {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }, [pathname]);


    useEffect(() => {
        if (isSearchOpen) {
            setStepSearchAnim(1);
            setTimeout(() => setStepSearchAnim(2), 30);
        } else {
            setStepSearchAnim(0);
        }
    }, [isSearchOpen]);

    const toggleSearchBox = () => {
        setIsSearchOpen((prev) => !prev)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSignInForm = () => {
        setIsSignInOpen(prev => !prev)
    };

    useEffect(() => {
        if (session) setIsSearchOpen(false)
    }, [session])

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuCloseTimeout = useRef(null);

    const handleMouseEnter = () => {
        if (menuCloseTimeout.current) {
            clearTimeout(menuCloseTimeout.current);
        }
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        menuCloseTimeout.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 500);
    };

    return (
        <header className={"w-screen h-[75px] " + (isTransparent ? "bg-transparent" : "bg-[#20272D]")}>
            <div className="container w-full h-full px-5 flex justify-between items-center font-bold tracking-[0.075em]">
                <div className="h-full text-secondary-white flex gap-3 items-center">
                    <Image width={60} height={20} src="/img/logo.png" alt="letterboxd logo" />
                    <h1 className="text-3xl">Letterboxd</h1>
                </div>
                {
                    isSignInOpen
                        ? <SignInForm formToggle={handleSignInForm} />
                        : <div className="flex gap-2 items-center">
                            <nav>
                                <ul className="flex gap-3 items-center">
                                    {
                                        session
                                            ? <>
                                                <li className={"relative group rounded-t-md shadow-2xl " + (isMenuOpen ? "bg-[#8899AA]" : "")}>
                                                    <div onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        className={"flex gap-2 px-2 py-2 items-center " + (isMenuOpen ? "text-secondary-white" : "")}>
                                                        <img src={session.user.photo ? session.user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="profile picture" className="size-[24px] rounded-full aspect-square mt-[-1px]" />
                                                        <div>{session.user.username.toUpperCase()}</div>
                                                        <div className="mt-[-1px]"><FontAwesomeIcon icon={faChevronDown} /></div>
                                                    </div>
                                                    {isMenuOpen &&
                                                        <ul onMouseEnter={handleMouseEnter}
                                                            onMouseLeave={handleMouseLeave}
                                                            className="shadow-2xl z-20 absolute bg-inherit w-full text-[#2c3440] py-2 border-t border-[#7E8D9E] rounded-b-md font-light text-xs">
                                                            {userNav.map((item, index) => <Link key={index} href={item.link}>
                                                                <li className={"hover:bg-[#667888] hover:text-secondary-white px-2 py-1 border-[#7E8D9E] "
                                                                    + (index === userNav.length - 3 ? "border-t" : "")}>
                                                                    {item.name}
                                                                </li>
                                                            </Link>
                                                            )}
                                                            <li onClick={signOut} className={"hover:bg-[#667888] hover:text-secondary-white px-2 py-1"}>Sign Out</li>
                                                        </ul>
                                                    }
                                                </li>
                                                <li className="ml-[-8px]"><Link href="/activity/"><FontAwesomeIcon icon={faBolt} /></Link></li>
                                            </>
                                            :
                                            <>
                                                <li>
                                                    <button onClick={handleSignInForm}>SIGN IN</button>
                                                </li>
                                                <li>
                                                    <button onClick={openModal}>CREATE ACCOUNT</button>
                                                    <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
                                                </li>
                                            </>
                                    }
                                    {nav.map((item, index) => <li key={index}><Link href={item.link}>{item.name.toUpperCase()}</Link></li>
                                    )}
                                    {session && <li><button onClick={toggleSearchBox}>{isSearchOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}</button></li>}
                                </ul>
                            </nav>
                            {
                                session
                                    ? <div className="relative flex items-center">
                                        <form className={`relative flex items-center overflow-hidden transition-all duration-500 ease-in-out rounded-full ${stepSearchAnim === 2 ? 'w-[112px]' : stepSearchAnim === 1 ? 'w-[56px]' : 'w-0'}`}
                                            style={{ transition: isSearchOpen && stepSearchAnim === 2 ? 'all 500ms ease-in-out' : 'none' }}
                                        >
                                            <input className={`focus:bg-white focus:text-[#657B8F] bg-[#2C3540] py-2 rounded-full pl-2 ${stepSearchAnim === 2 ? 'w-[112px]' : ''}`} />
                                            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isSearchOpen && stepSearchAnim === 2 ? 'opacity-100' : 'opacity-0'}`}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </form>
                                    </div>
                                    : <div className="relative flex items-center">
                                        <form className={`relative flex items-center overflow-hidden transition-all duration-500 ease-in-out rounded-full w-[112px]`}>
                                            <input className={`focus:bg-white focus:text-[#657B8F] bg-[#2C3540] py-2 rounded-full pl-2 w-[112px]`} />
                                            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 opacity-100`}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </form>
                                    </div>
                            }
                            <div className={`text-secondary-white flex shadow-sm transition-all duration-500 ease-in-out ${!isSearchOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
                                style={{ transition: !isSearchOpen ? 'all 500ms ease-in-out' : 'none' }}>
                                <button className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded-l flex gap-1 items-center"><FontAwesomeIcon icon={faPlus} /><p>LOG</p></button>
                                <button className="bg-green-200 hover:bg-green-300 px-2 py-1 rounded-r"><FontAwesomeIcon icon={faChevronDown} /></button>{/*Add start a new list*/}
                            </div>
                        </div>
                }
            </div>
        </header>
    )
}