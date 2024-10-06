"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const filmNavbar = [
    { name: "Cast", to: "/" },
    { name: "Crew", to: "crew" },
    { name: "Details", to: "details" },
    { name: "Genres", to: "genres" },
    { name: "Releases", to: "releases" },
];
const FilmNavbar = () => {
    const [selected, setSelected] = useState(filmNavbar[0].name);
    const pathName = usePathname();
    const basePath = pathName.split('/').slice(0, 3).join('/');

    return (
        <div className='pt-8 mb-4 font-bold relative flex justify-between w-full items-center border-b border-b-gray-500'>
            <nav className="flex space-x-4 h-full">
                {filmNavbar.map((item) => (
                    <div className="relative py-2 group" key={item.name}>
                        <Link href={`${basePath}/${item.to}`}>
                            <span
                                onClick={() => setSelected(item.name)}
                                className={`h-full cursor-pointer ${selected === item.name ? 'text-white' : 'text-green-500'}`}
                            >
                                {item.name.toUpperCase()}
                            </span>
                        </Link>
                        <div className={`absolute top-[100%] left-0 w-full h-[1px] ` + (selected === item.name ? "bg-[#fff]" : "group-hover:bg-green-500")}></div>
                    </div>
                ))}
            </nav>
        </div>
    );
};



export default FilmNavbar;
