'use client';

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const [user, setUser] = useState({
    id:"",
    username:"",
    email:""
  })
  const router = useRouter();
  const handleClick = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log(response.data);
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error : any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const data = async () => {
    try {
      const res = await axios.get('/api/users/me')
      setUser(res.data.user);
    } catch (error:any) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    data();
  }, [])
  
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
      <div className='bg-white h-fit w-fit p-4 rounded-lg'>
        <div className='flex w-full justify-center items-center h-[50px]'>
          <BiUserCircle size={50}/>
        </div>
        <h1 className='text-2xl m-3 font-bold'>{user.username?user.username:''}</h1>
        <h1 className='text-2xl m-3 font-bold'>{user.email?user.email:''}</h1>
        <button className='bg-[blue] text-white m-3 p-2 rounded-xl' onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

export default ProfilePage