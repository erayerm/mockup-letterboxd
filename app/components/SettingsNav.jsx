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
        <nav className="flex space-x-4 p-4">
            {settingsNavbar.map((item) => (
                <Link key={item.name} href={item.to}>
                    <span
                        onClick={() => setSelected(item.name)} // Eleman tıklandığında seçili durumu güncelle
                        className={`cursor-pointer ${selected === item.name ? 'text-white' : 'text-green-500'
                            }`}
                    >
                        {item.name}
                    </span>
                </Link>
            ))}
        </nav>
    );
};

export default SettingsNavbar;
