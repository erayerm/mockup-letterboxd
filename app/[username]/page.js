'use client'

import { useEffect, useState } from "react"
import ProfileTop from "../components/profile/ProfileTop"
import ProfileNav from "../components/profile/ProfileNav"
import ProfileMain from "../components/profile/ProfileMain"
import ProfileSidebar from "../components/profile/ProfileSidebar"

function Profile({ params }) {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/users/${params.username}`);
                const data = await response.json();
                setUserData(data);
                dispatch(changeCurrentUser(data));
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);
    return (
        <div className="w-full h-screen bg-[#20272D]">
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