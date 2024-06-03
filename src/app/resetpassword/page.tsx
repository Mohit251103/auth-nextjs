"use client";
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleClick = async () => {
        try {
            const token = window.location.search.split('=')[1];
            const response = await axios.post("/api/users/changepassword",{token,password});
            console.log(response.data);
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
        }
    }
    return (
        <div className=' h-[100vh] w-full flex justify-center items-center'>
            <div className='h-fit w-[30%] bg-[white] rounded-xl p-5 shadow-2xl shadow-black'>
                <h1 className='text-[blue] font-bold text-2xl'>Change Password</h1>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Password:</h1>
                    <input type="password" name='password' id='password' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder='Password' />
                </div>
                <button className='bg-[blue] p-2 mt-2 rounded-lg shadow-lg shadow-black text-base text-[white] hover:scale-105' onClick={handleClick}>Change Password</button>
            </div>
        </div>
    )
}

export default ResetPasswordPage