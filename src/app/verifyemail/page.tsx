"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BiCheckCircle } from 'react-icons/bi';

const VerifyEmailPage = () => {

    const [verified, setVerified] = useState(false);
    const [token, setToken] = useState('')
    const router = useRouter();

    useEffect(() => {
        const token = window.location.search.split('=')[1];
        setToken(token);
    }, [])

    const init = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail',{token});
            setVerified(true);
            console.log(response);
            // router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
      init();
    }, [token])
    

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            {
            !verified? <div>Verifying the user....</div>:
            <div className='flex flex-col justify-center items-center'>
                <p className='text-xl'>Verification completed <BiCheckCircle size={50}/></p>
                <p className='text-xl'>Go back to the site and login.</p>
            </div>
            }
        </div>
    )
}

export default VerifyEmailPage