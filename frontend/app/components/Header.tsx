'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import NavbarItems from './NavbarItems';
import { AuthTodoContext } from '../context/authTodoContext';

const Navbar = () => {
    const {openMenu, toggleMenu} = useContext(AuthTodoContext);
    
  return (
    <header className='bg-slate-800 py-4 px-5 sticky top-0 shadow-md backdrop-blur-md text-white'>
        <section className='flex justify-between items-center'>
            {/* Logo goes here */}
            <Link href={'/'} className='font-semibold text-xl text-cyan-600'>
                ZedTodo
            </Link>

            {/* Menu Button */}
            <button onClick={toggleMenu} className='hover:text-cyan-500 md:hidden'>
                {!openMenu ? 
                    <AiOutlineMenu size={28} /> : <AiOutlineClose size={28} />
                }
            </button>

            {/* Navbar Menu Items on Desktop */}
            <div className='hidden md:block'>
                <NavbarItems />
            </div>
        </section>

        {/* Navbar Menu Items on mobile menu */}
        <div className={`${openMenu ? 'block' : 'hidden'} md:hidden`}>
            <NavbarItems />
        </div>
    </header>
  )
}

export default Navbar