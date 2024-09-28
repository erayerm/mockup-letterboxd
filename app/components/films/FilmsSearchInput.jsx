"use client"

import { useState } from "react";

function FilmsSearchInput() {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <div className="flex items-center gap-2">
            <p>FIND A FILM</p>
            <input onChange={handleSearch} value={searchValue} type="text" className="shadow-[inset_0_-1px_0_#456] bg-[#2D3440] focus:bg-[#fff] text-[#556677] focus:text-[#000] h-8 py-1 px-2.5 rounded" />
        </div>
    )
}

export default FilmsSearchInput