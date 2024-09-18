'use client'

import ProfileTop from "../components/profile/ProfileTop"
import ProfileNav from "../components/profile/ProfileNav"
import ProfileMain from "../components/profile/ProfileMain"
import ProfileSidebar from "../components/profile/ProfileSidebar"
import { useEffect, useState } from "react"
import API_URL from "../api/url"
import axios from "axios"


function Profile({ params }) {
    const [userData, setUserData] = useState([]);
    const { username } = params;
    useEffect(() => {
        async function getUser(username) {
            try {
                const response = await axios.get(`${API_URL}/users/${username}`);
                console.log(`User ${username}'s data fetched successfully`)
                setUserData(response.data.userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        }
        getUser(username);
    }, [])

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