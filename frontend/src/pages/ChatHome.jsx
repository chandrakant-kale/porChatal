import React, { useCallback, useEffect, useState } from 'react'

export default function ChatHome() {

  const [user, setUser] = useState({});

  const [showMenu, setShowMenu] = useState(false)

  const getUser = async () => {
    try {
      const responce = await fetch("http://localhost:5000/home", {
        credentials: "include"
      })

      const data = await responce.json();
      setUser(data.user);

    } catch (error) {

    }
  }

  const optionBtn = useCallback(() => {
    setShowMenu(!showMenu)
  }, [showMenu]);

  useEffect(() => {
    getUser();

  }, [])

  return (
    <div className='w-full flex flex-col justify-center items-center'>

      <header className='w-full flex justify-between px-10 py-7 items-center bg-blue-950/10 border-b border-cyan-300/10'>

        <div className='flex justify-center items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-orange-600' />
          <div>............</div>
        </div>
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className=" text-2xl text-white/50 hover:text-white">
            ...
          </button>
          {showMenu &&
            <div className='fixed border border-blue-900/30 right-15 h-25 w-40 flex flex-col'>
              <button
                onClick={() => setShowMenu(!option)}
                className='p-2'>Connect</button>
              <button
                onClick={() => setShowMenu(!option)}
                className='p-2'>Disconnect</button>
            </div>}
        </div>
      </header>
      <section>

      </section>
    </div>
  )
}