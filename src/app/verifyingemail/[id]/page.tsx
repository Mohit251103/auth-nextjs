"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const VerifyingEmailPage = ({params}:any) => {

    const router = useRouter();
    const {id} = params;
    const [isverified, setIsVerified] = useState(false)
    var timer:NodeJS.Timeout;

    const init = async () => {
        try {
            const res = await axios.post('/api/users/isverified',{id});
            if(res.data.isverified){
                setIsVerified(true);
            }
            console.log(res);
        } catch (error:any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        timer = setInterval(()=>{
            init();
        },2000)
    }, [])

    useEffect(()=>{
        clearInterval(timer);
        router.push('/login');
    },[isverified]);
    

    return (
        <div className='flex justify-center items-center h-[100vh] bg-white'>
            {isverified===false?
            <p className='text-xl'>
                Verification link has been sent to your email.Click on it to verify your email
            </p>: 
            <p className='text-xl'>Verified. Moving to login page...</p>}
        </div>
    )
}

export default VerifyingEmailPage