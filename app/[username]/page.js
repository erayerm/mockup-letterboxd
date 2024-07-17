'use client'

import { useState } from "react"
import { user } from "../mock/user"
import ProfileTop from "../components/profile/ProfileTop"
import ProfileNav from "../components/profile/ProfileNav"
import ProfileMain from "../components/profile/ProfileMain"
import ProfileSidebar from "../components/profile/ProfileSidebar"

function Profile() {
    const [userData, setUserData] = useState(user)
    return (
        <div className="w-full pb-20 bg-[#20272D]">
            <div className="container">
                <ProfileTop userData={userData} />
                <ProfileNav username={userData.username} />
                <div className="flex w-full justify-between">
                    <ProfileMain />
                    <ProfileSidebar />
                </div>
            </div>
        </div>
    )
}



export default Profile