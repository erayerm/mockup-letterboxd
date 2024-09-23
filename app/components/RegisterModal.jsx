"use client";

import { useEffect, useState } from "react";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { checkUsernameUsed } from "@/actions/checkUsernameUsed";
import UsernameStatus from "../enums/UsernameStatus";

/*
TODO
control email and password
control if checkboxes checked
change nav buttons by logged status
am i gonna autologin after register or just open login page
css for username status
*/

export default function RegisterModal({ isOpen, onClose }) {
    const [error, setError] = useState();
    const [usernameStatus, setUsernameStatus] = useState(null);
    const [username, setUsername] = useState("");

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const r = await register({
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username"),
        });
        if (r?.error) {
            setError(r.error);
            return;
        } else {
            onClose();
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = async (e) => {
        if (e.target.value.length >= 15) return;
        setUsername(e.target.value);
    }

    const [typingTimeout, setTypingTimeout] = useState(null);

    const validateUsername = async (username) => {
        if (username === "") {
            setUsernameStatus(null);
            return;
        }
        if (!/^[a-z0-9_]+$/.test(username)) {
            setUsernameStatus(UsernameStatus.Wrong_Character);
            return;
        }
        if (username.length < 2) {
            setUsernameStatus(UsernameStatus.Too_Short);
            return;
        }

        setUsernameStatus(UsernameStatus.Checking);

        //debounce ********
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(async () => {
            const r = await checkUsernameUsed(username);
            setUsernameStatus(r);
        }, 300));
    };

    useEffect(() => {
        validateUsername(username);
    }, [username]);

    useEffect(() => {
        if (!isOpen) {
            setUsername("");
            setUsernameStatus(null);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleBackgroundClick}
        >
            <div className="p-8 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-[#435666] rounded font-normal">
                {error && <div className="">{error}</div>}
                <p className="mb-2 w-full text-[18px]">JOIN LETTERBOXD</p>

                <form onSubmit={handleSubmit} className="text-[#fff] w-full">
                    <div className="register-input-div">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="register-input w-full"
                            name="email"
                        />
                    </div>
                    <div className="register-input-div">
                        <label>Username</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="register-input w-[200px]"
                                name="username"
                                onChange={handleChange}
                                value={username}
                            />
                            {usernameStatus && <p>{usernameStatus}</p>}
                        </div>
                    </div>
                    <div className="register-input-div">
                        <label>Password</label>
                        <input
                            type="password"
                            className="register-input w-[200px]"
                            name="password"
                        />
                    </div>
                    <label class="container-check mt-2">I'm at least 16 years old and accept the <span className="text-[#fff]">Terms of Use</span>.
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="container-check">I accept the <span className="text-[#fff]">Privacy Policy</span> and consent to the processing of my personal information in accodance with it.
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                    </label>
                    <button className="mt-10 bg-green-400 hover:bg-green-500 px-2 py-1 rounded-l flex gap-1 items-center">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}