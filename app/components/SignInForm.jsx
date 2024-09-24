"use client"

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from 'react-hook-form';

function SignInForm({ formToggle }) {
    const { register: formRegister, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit = async (data) => {
        const res = await signIn("credentials", {
            identifier: data.identifier,
            password: data.password,
            rememberMe: data.remember_me,
            redirect: false,
        });
        if (res?.error) {
            setError(res.error);
        }
        if (res?.ok) {
            reset();
            formToggle();
        }
    };
    return (
        <div className='flex items-center gap-3 text-[#678]'>
            <button className='bg-inherit size-6'><FontAwesomeIcon icon={faX} className="cursor-pointer" onClick={formToggle} /></button>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-3 text-[11px] font-normal'>
                <div className="sign-in-input-div">
                    <label htmlFor='username-sign-in'>Username</label>
                    <div className="w-full flex gap-2 items-center">
                        <input
                            type="text"
                            className="sign-in-input w-[150px]"
                            {...formRegister("identifier", { required: "Enter Your Username" })}
                            id='username-sign-in'
                        />
                    </div>
                </div>
                <div className="sign-in-input-div">
                    <div className='flex justify-between w-full'>
                        <label htmlFor='password-sign-in'>Password</label>
                        <a className='text-green-100'>Forgotten?</a>
                    </div>
                    <div className="w-full flex gap-2 items-center">
                        <input
                            type="password"
                            className="sign-in-input w-[150px]"
                            {...formRegister("password", { required: "Enter Your Password" })}
                            id='password-sign-in'
                        />
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <input className='checkbox' id='remember-me-sign-in' type="checkbox" {...formRegister("remember_me")} />
                    <label htmlFor='remember-me-sign-in' className='whitespace-nowrap'>Remember me</label>
                </div>
                <button className="whitespace-nowrap bg-green-400 hover:bg-green-500 text-[#fff] px-3 py-1 rounded">
                    SIGN IN
                </button>
            </form>
        </div>
    )
}

export default SignInForm