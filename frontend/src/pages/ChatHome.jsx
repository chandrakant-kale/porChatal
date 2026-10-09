import React, { useEffect, useState } from 'react'

export default function ChatHome() {
  
  const [user, setUser] = useState({});

  const getUser = async()=>{
    try {
      const responce = await fetch("http://localhost:5000/home",{
        credentials:"include"
      })

      const data = await responce.json();
      setUser(data.user);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      hello {user.username}
    </div>
  )
}
