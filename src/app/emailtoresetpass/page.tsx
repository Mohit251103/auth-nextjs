"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const EmailToChangePass = () => {
    const [email, setEmail] = useState('')
    const router = useRouter();

    const handleClick = async () => {
        try {
            const res = await axios.post("/api/users/resettingpassword",{email});
            console.log(res.data);
            router.push('/resettingpassword');
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return (
        <div className=' h-[100vh] w-full flex justify-center items-center'>
            <div className='h-fit w-[30%] bg-[white] rounded-xl p-5 shadow-2xl shadow-black'>
                <h1 className='text-[blue] font-bold text-2xl'>Enter your Email</h1>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Email:</h1>
                    <input type="text" name='email' id='email' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder='Email' />
                </div>
                <button className='bg-[blue] p-2 mt-2 rounded-lg shadow-lg shadow-black text-base text-[white] hover:scale-105' onClick={handleClick}>Proceed</button>
            </div>
        </div>
    )
}

export default EmailToChangePass