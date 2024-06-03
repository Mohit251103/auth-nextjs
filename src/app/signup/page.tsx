"use client";
import React,{useEffect, useState} from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from "next/navigation";

const SignupPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
        email : "",
        username : "",
        password : ""
    })

    const [isDisabled, setIsDisabled] = useState(true);

    // const path = "http://localhost:5000";
    const handleSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup",user);
            router.push(`/verifyingemail/${response.data.data._id}`);
            console.log(response);
        } catch (error) {
            toast.error("Sign up failed");
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setIsDisabled(false);
        }
        else{
            setIsDisabled(true);
        }
    },[user]);

    // console.log(user.email);
    return (
        <div className=' h-[100vh] w-full flex justify-center items-center'>
            <div className='h-fit w-[30%] bg-[white] rounded-xl p-5 shadow-2xl shadow-black'>
                <h1 className='text-[blue] font-bold text-2xl'>Sign Up</h1>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Email:</h1>
                    <input type="text" name='email' id='email' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={user.email} onChange={(e)=>{
                        setUser({...user, email:e.target.value})
                    }} placeholder='Email'/>
                </div>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Username:</h1>
                    <input type="text" name="username" id="username" className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={user.username} onChange={(e)=>{
                        setUser({...user, username:e.target.value})
                    }} placeholder='Username'/>
                </div>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Password:</h1>
                    <input type="password" name='password' id='password' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={user.password} onChange={(e)=>{
                        setUser({...user, password:e.target.value})
                    }} placeholder='Password'/>
                </div>
                <h1 className='text-sm mt-1'>Already have an account? <span className='text-[blue]'><Link href="/login">Login</Link></span></h1>
                <button className={`bg-[blue] p-2 mt-2 rounded-lg shadow-lg shadow-black text-base text-[white] hover:scale-105`} disabled={isDisabled} onClick={handleSignup}>{isDisabled?'No SignUp':'Sign Up'}</button>
            </div>
        </div>
    )
}

export default SignupPage