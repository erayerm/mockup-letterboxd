import axios from "axios";
import API_URL from "@/app/api/url";

export const getUsersFilmData = async (username, slugifiedTitle) => {
    return await axios.get(`${API_URL}/users/${username}/films?slugifiedTitle=${slugifiedTitle}`);
}

export const updateUsersFilmData = async (username, data) => {
    return await axios.put(`${API_URL}/users/${username}/films`, data);
}

export const getUserData = async (username) => {
    return await axios.get(`${API_URL}/users/${username}`)
}

export const updateUserData = async (username, data) => {
    return await axios.put(`${API_URL}/users/${username}`, data);
}

export const getFilmData = async (slugifiedTitle) => {
    return await axios.get(`${API_URL}/films/${slugifiedTitle}/`)
}

export const titleSlugifier = (title) => {
    return title.toLowerCase().replaceAll(/[.\-'",]/g, "").replaceAll(" ", "-");
}