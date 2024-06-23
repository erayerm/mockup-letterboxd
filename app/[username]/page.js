'use client'

import { useState } from "react"
import { user } from "../mock/user"
import ProfileTop from "../components/profile/ProfileTop"

function Profile() {
    const [userData, setUserData] = useState(user)
    return (
        <div className="w-full h-screen bg-[#20272D] text-[#D8E0E8]">
            <div className="max-w-[950px] mx-auto">
                <ProfileTop userData={userData} />
            </div>
        </div>
    )
}



export default Profile