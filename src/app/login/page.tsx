"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email : "",
        password : ""
    })

    const handleClick = async () => {
        try {
            let response = await axios.post('/api/users/login',user);
            console.log(response.data);
            router.push('/profile');
        } catch (error : any) {
            console.log(error);
        }
    }

    // console.log(user.email);
    return (
        <div className=' h-[100vh] w-full flex justify-center items-center'>
            <div className='h-fit w-[30%] bg-[white] rounded-xl p-5 shadow-2xl shadow-black'>
                <h1 className='text-[blue] font-bold text-2xl'>Login</h1>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Email:</h1>
                    <input type="text" name='email' id='email' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={user.email} onChange={(e)=>{
                        setUser({...user, email:e.target.value})
                    }} placeholder='Email'/>
                </div>
                <div className='mt-5'>
                    <h1 className='font-medium text-lg'>Password:</h1>
                    <input type="password" name='password' id='password' className='mt-2 w-full border-black text-base p-1 bg-slate-200 rounded-lg' value={user.password} onChange={(e)=>{
                        setUser({...user, password:e.target.value})
                    }} placeholder='Password'/>
                </div>
                <h1 className='text-sm mt-1'>Don't have an account? <span className='text-[blue]'><Link href="/signup">Sign Up</Link></span></h1>
                <p className='text-sm mt-1'>Forgot Password? <span className='text-[blue]'><Link href="/emailtoresetpass">Reset Password</Link></span></p>
                <button className='bg-[blue] p-2 mt-2 rounded-lg shadow-lg shadow-black text-base text-[white] hover:scale-105' onClick={handleClick}>Login</button>
            </div>
        </div>
  )
}

export default LoginComponent