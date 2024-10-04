"use client"

import axios from "axios";
import API_URL from "@/app/api/url";

export const getUsersMovieData = async (username, slugifiedTitle) => {
    const res = await axios.get(`${API_URL}/users/${username}/films?slugifiedTitle=${slugifiedTitle}`);
    return res
}

export const updateUsersMovieData = async (username, data) => {
    return await axios.put(`${API_URL}/users/${username}/films`, data);
}

export const titleSlugifier = (title) => {
    return title.toLowerCase().replaceAll(/[.\-'",]/g, "").replaceAll(" ", "-");
}