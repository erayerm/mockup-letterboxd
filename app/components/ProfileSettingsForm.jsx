"use client"

import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import API_URL from '../api/url';
import axios from 'axios';

function ProfileSettingsForm() {
    const session = useSelector((state) => state.session);
    const [userData, setUserData] = useState({})
    const { register: formRegister, handleSubmit, watch, reset } = useForm();

    useEffect(() => {
        async function getUser(username) {
            try {
                const response = await axios.get(`${API_URL}/users/${session.user.username}`);
                console.log(`User ${username}'s data fetched successfully`)
                setUserData(response.data.userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        }
        if (session) getUser(session.user.username);
    }, [session])

    useEffect(() => {
        if (userData)
            reset(userData)
    }, [userData])

    const givenName = watch("givenName");
    const username = watch("username");
    const pronoun = watch("pronoun");

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/users/${session.user.username}`, data);
            console.log("User updated successfully:", response.data)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className='flex items-center gap-3 text-[#fff]'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center text-[11px] font-normal'>
                <div className="settings-input-div">
                    <div className='flex justify-between w-full'>
                        <label htmlFor='username-settings'>Username</label>
                        <button>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </div>
                    <div className="w-full flex gap-2 items-center">
                        <input
                            type="text"
                            className="settings-input w-full"
                            {...formRegister("username", { required: "Enter Your Username" })}
                            id='username-settings'
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-between w-full settings-input-div'>
                    <div className='basis-[48%]'>
                        <label htmlFor='givenName-settings'>Given Name</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="settings-input w-full"
                                {...formRegister("givenName")}
                                id='givenName-settings'
                            />
                        </div>
                    </div>
                    <div className='basis-[48%]'>
                        <label htmlFor='familyName-settings'>Family Name</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="settings-input w-full"
                                {...formRegister("familyName")}
                                id='familyName-settings'
                            />
                        </div>
                    </div>
                </div>
                <div className="settings-input-div">
                    <label htmlFor='email-settings'>Email address</label>
                    <div className="w-full flex gap-2 items-center">
                        <input
                            type="text"
                            className="settings-input w-full"
                            {...formRegister("email", { required: "Enter Your Email" })}
                            id='email-settings'
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-between settings-input-div'>
                    <div className='basis-[48%]'>
                        <label htmlFor='location-settings'>Location</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="settings-input w-full"
                                {...formRegister("location")}
                                id='location-settings'
                            />
                        </div>
                    </div>
                    <div className='basis-[48%]'>
                        <label htmlFor='website-settings'>Website</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="settings-input w-full"
                                {...formRegister("website")}
                                id='website-settings'
                            />
                        </div>
                    </div>
                </div>
                <div className="settings-input-div">
                    <label htmlFor='bio-settings'>Bio</label>
                    <textarea
                        {...formRegister("bio")}
                        id='bio-settings'
                        className='settings-input w-full'
                        rows="3"
                    />
                </div>
                <div className="settings-input-div">
                    <div className='flex gap-2'>
                        <label htmlFor='pronoun-settings'>Pronoun</label>
                        <InfoQuestionMark text={"Read our post on pronouns"} />
                    </div>
                    <div className='flex w-full gap-2 text-[#678]'>
                        <select
                            {...formRegister("pronoun")}
                            id='pronoun-settings'
                            className='settings-input basis-[45%]'
                            defaultValue={pronouns[0].replaceAll(" ", "").replace("/", "-").toLowerCase()}
                        >
                            {pronouns.map((item, index) => {
                                return <option key={index} value={item.replaceAll(" ", "").replace("/", "-").toLowerCase()}>{item}</option>
                            })}
                        </select>
                        <p className='desc-pron text-[13px] basis-[50%]'>Example use:
                            {" "}<span>{givenName !== "" ? givenName : username}</span>{" "}
                            added <span>Pride</span> to <span>{pronoun?.split("-")[1]} watchlist</span>
                        </p>
                    </div>
                </div>
                <div className="settings-input-div">
                    <div className='flex gap-2'>
                        <label htmlFor='posters-settings'>Posters</label>
                        <InfoQuestionMark text={"Read our post on custom posters"} />
                    </div>

                    <div className='flex w-full gap-2 items-center'>
                        <select
                            {...formRegister("posters")}
                            id='posters-settings'
                            className='settings-input basis-[45%]'
                            defaultValue="any"
                        >
                            <option value="any">Any</option>
                            <option value="no">No</option>
                        </select>
                        <p className='desc-pron text-[13px] basis-[50%] text-[#678]'>
                            custom posters will be shown
                        </p>
                    </div>
                </div>
                <div className="settings-input-div">
                    <div className='flex gap-2'>
                        <label htmlFor='replies-settings'>Replies</label>
                        <InfoQuestionMark text={"This default cen be overridden on individual reviews and lists"} />
                    </div>

                    <div className='flex w-full gap-2 items-center'>
                        <select
                            {...formRegister("replies")}
                            id='replies-settings'
                            className='settings-input basis-[45%]'
                            defaultValue="any"
                        >
                            <option value="anyone">Anyone</option>
                            <option value="friends">Friends (people you follow)</option>
                            <option value="you">You</option>
                        </select>
                        <p className='desc-pron text-[13px] basis-[50%] text-[#678]'>
                            can reply to your content
                        </p>
                    </div>
                </div>
                <div className='flex self-start items-center gap-3 setting-input-div pt-4'>
                    <input className='checkbox shadow-[inset_0_-1px_0_#456]' id='include-to-members' type="checkbox" {...formRegister("includeToMembers")} />
                    <label htmlFor='include-to-members' className='whitespace-nowrap'>Include profile in the <span className='text-blue-400'>Members</span> section</label>
                </div>
                <div className='flex self-start items-center gap-3 setting-input-div pt-2'>
                    <input className='checkbox shadow-[inset_0_-1px_0_#456]' id='adult-contents' type="checkbox" {...formRegister("adultContents")} />
                    <label htmlFor='adult-contents' className='whitespace-nowrap'>
                        <div className='flex flex-col mt-4'>
                            <div className='flex gap-2'>
                                <p>Adult content</p>
                                <InfoQuestionMark text={"Read our post on adult titles"} />
                            </div>
                            <p className='text-[10px] text-[#678]'>Include in content from friends and search; show adult posters</p>
                        </div>
                    </label>
                </div>
                <button type='submit' className="text-[14px] font-bold self-start mt-5 whitespace-nowrap bg-green-400 hover:bg-green-500 text-[#fff] px-3 py-1 rounded">
                    SAVE CHANGES
                </button>
            </form>
        </div>
    )
}

const pronouns = [
    "They / their",
    "He / his",
    "He / their",
    "She / her",
    "She / their",
    "Xe / xyr",
    "Ze / hir",
    "Ze / zir",
    "It / its"
];

const InfoQuestionMark = ({ text }) => {

    return (
        <div className='relative group cursor-pointer px-[6px] bg-[rgb(102,119,136)] rounded-full'>?
            <div className='absolute bg-[rgb(102,119,136)] px-2 py-1 top-[-30px] left-1/2 transform -translate-x-1/2 whitespace-nowrap hidden group-hover:block'>{text}</div>
            <div className="absolute -translate-x-1/2 top-[-6px] left-1/2 size-0 border-[7px] border-[rgb(102,119,136)] hidden group-hover:block border-l-transparent border-r-transparent border-b-transparent" />
        </div>
    )
}


export default ProfileSettingsForm