"use client"

import { useState } from 'react';
import Link from 'next/link';

const settingsNavbar = [
    { name: "Profile", to: "/settings/" },
    { name: "Auth", to: "/settings/auth/" },
    { name: "Avatar", to: "/settings/avatar/" },
    { name: "Connections", to: "/settings/connections/" },
    { name: "Notifications", to: "/settings/notifications/" },
    { name: "Stores & Streaming", to: "/settings/stores/" },
    { name: "Data", to: "/settings/data/" },
];
const SettingsNavbar = () => {
    const [selected, setSelected] = useState(settingsNavbar[0].name); // Varsayılan olarak ilk eleman seçili

    return (
        <div className='relative flex justify-between w-full items-center border-b border-b-gray-500'>
            <nav className="flex space-x-4 h-full">
                {settingsNavbar.map((item) => (
                    <div className="relative py-2 group" key={item.name}>
                        <Link href={item.to}>
                            <span
                                onClick={() => setSelected(item.name)} // Eleman tıklandığında seçili durumu güncelle
                                className={`h-full cursor-pointer ${selected === item.name ? 'text-white' : 'text-green-500'}`}
                            >
                                {item.name.toUpperCase()}
                            </span>
                        </Link>
                        <div className={`absolute top-[100%] left-0 w-full h-[1px] ` + (selected === item.name ? "bg-[#fff]" : "group-hover:bg-green-500")}></div>
                    </div>
                ))}
            </nav>
            <button>Deactivate Account</button>
        </div>
    );
};



export default SettingsNavbar;
