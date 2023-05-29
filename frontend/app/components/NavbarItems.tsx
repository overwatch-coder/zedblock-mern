'use client'

import Link from 'next/link'
import React, {useContext} from 'react'
import { AuthTodoContext } from '../context/authTodoContext'
import {BsPersonCircle} from 'react-icons/bs';

const NavbarItems = () => {
    const {user} = useContext(AuthTodoContext);

  return (
    <nav className={`flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:space-x-4 mt-6 md:mt-0 mb-4 md:mb-0`}> 
        {user?.username &&
           <>
            <Link href={'/'} className='hover:text-cyan-600'>Tasks</Link>
            <Link href={'/create'} className='hover:text-cyan-600'>Add Task</Link>
            <p className='pt-5 md:pt-0 md:pl-10 flex items-center space-x-3'>
                <BsPersonCircle size={30} />
                <span>{user?.username || "Guest"}</span>
            </p>
           </> 
        }
        {!user?.username && 
        <>
            <Link href={'/login'} className='hover:text-cyan-600 uppercase'>Login</Link>
            <Link href={'/register'} className='hover:text-cyan-600 uppercase'>Register</Link>
        </>
        }
    </nav>
  )
}

export default NavbarItems