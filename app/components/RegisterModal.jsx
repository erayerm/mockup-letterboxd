"use client";

import { useEffect, useState } from "react";
import { register } from "@/actions/register";
import { checkUsernameUsed } from "@/actions/checkUsernameUsed";
import UsernameStatus from "../enums/UsernameStatus";
import { faCheck, faCircle, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

export default function RegisterModal({ isOpen, onClose }) {
    const { register: formRegister, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onSubmit"
    });
    const [usernameStatus, setUsernameStatus] = useState(null);
    const [username, setUsername] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [errorMail, setErrorMail] = useState();
    const onSubmit = async (data) => {
        if (usernameStatus !== UsernameStatus.Available) {
            alert("Username is not available");
            return;
        }
        const r = await register({
            email: data.email,
            password: data.password,
            username: data.username,
        });
        if (r?.error) {
            setErrorMail(r.error);
            return;
        } else {
            reset();
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
    };

    const validateUsername = async (username) => {
        if (username === "") {
            setUsernameStatus(null);
            return;
        }
        setUsernameStatus(UsernameStatus.Checking);

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
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleBackgroundClick}
        >
            <div className="p-10 w-full max-w-[450px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-[#435666] rounded font-normal">
                <p className="mb-2 w-full text-[18px]">JOIN LETTERBOXD</p>

                <form onSubmit={handleSubmit(onSubmit)} className="text-[#fff] w-full" noValidate>
                    <div className="register-input-div">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="register-input w-full"
                            {...formRegister("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            onChange={() => setErrorMail(null)}
                        />
                        {errors.email && <p className="form-error-message">{errors.email.message}</p>}
                        {errorMail && <div className="form-error-message">{errorMail}</div>}
                    </div>

                    <div className="register-input-div">
                        <label>Username</label>
                        <div className="w-full flex gap-2 items-center">
                            <input
                                type="text"
                                className="register-input w-[200px]"
                                {...formRegister("username", { required: "Username is required", maxLength: 15 })}
                                onChange={handleChange}
                                value={username}
                            />
                            {usernameStatus && {
                                [UsernameStatus.Checking]: <div className="text-blue-500 flex gap-2 items-center pl-2"><FontAwesomeIcon icon={faCircle} /> {usernameStatus}</div>,
                                [UsernameStatus.Taken]: <div className="text-orange-500 flex gap-2 items-center pl-2"><FontAwesomeIcon icon={faX} /> {usernameStatus}</div>,
                                [UsernameStatus.Available]: <div className="text-green-500 flex gap-2 items-center pl-2"><FontAwesomeIcon icon={faCheck} /> {usernameStatus}</div>,
                                [UsernameStatus.Too_Short]: <div className="text-gray-500 flex gap-2 items-center pl-2"><FontAwesomeIcon icon={faPen} /> {usernameStatus}</div>,
                                [UsernameStatus.Wrong_Character]: <div className="text-gray-500 flex gap-2 items-center"><FontAwesomeIcon icon={faPen} /> {usernameStatus}</div>,
                            }[usernameStatus]}
                        </div>
                    </div>

                    <div className="register-input-div">
                        <label>Password</label>
                        <input
                            type="password"
                            className="register-input w-[200px]"
                            {...formRegister("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        />
                        {errors.password && <p className="form-error-message">{errors.password.message}</p>}
                    </div>

                    <label className="container-check mt-2">I'm at least 16 years old and accept the <span className="text-[#fff]">Terms of Use</span>.
                        <input type="checkbox" {...formRegister("terms", { required: "You must accept the terms" })} />
                        <span className="checkmark"></span>
                    </label>
                    {errors.terms && <p className="form-error-message">{errors.terms.message}</p>}

                    <label className="container-check">I accept the <span className="text-[#fff]">Privacy Policy</span> and consent to the processing of my personal information in accordance with it.
                        <input type="checkbox" {...formRegister("privacy", { required: "You must accept the privacy policy" })} />
                        <span className="checkmark"></span>
                    </label>
                    {errors.privacy && <p className="form-error-message">{errors.privacy.message}</p>}

                    <button className="mt-10 bg-green-400 hover:bg-green-500 px-2 py-1 rounded-l flex gap-1 items-center">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}
