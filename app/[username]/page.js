'use client'

import { useState } from "react"
import { user } from "../mock/user"
import ProfileTop from "../components/profile/ProfileTop"
import ProfileNav from "../components/profile/ProfileNav"

function Profile() {
    const [userData, setUserData] = useState(user)
    return (
        <div className="w-full h-screen bg-[#20272D]">
            <div className="container">
                <ProfileTop userData={userData} />
                <ProfileNav username={userData.username} />
            </div>
        </div>
    )
}



export default Profile