"use client";

import ProfileTop from "../components/profile/ProfileTop";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileMain from "../components/profile/ProfileMain";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/functions";

function Profile({ params }) {
  const [userData, setUserData] = useState([]);
  const { username } = params;
  useEffect(() => {
    async function getUser(username) {
      try {
        const response = await getUserData(username);
        setUserData(response.data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    }
    getUser(username);
  }, []);
  return (
    <div className="pb-20 bg-[#14181C]">
      <div className="container">
        <ProfileTop userData={userData} />
        <ProfileNav username={userData.username} />
        <div className="flex justify-between">
          <ProfileMain />
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}

export default Profile;
