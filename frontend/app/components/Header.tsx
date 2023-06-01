'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import NavbarItems from './NavbarItems';
import { AuthTodoContext } from '../context/authTodoContext';

const Navbar = () => {
    const {openMenu, toggleMenu} = useContext(AuthTodoContext);
    
  return (
    <header className='sticky top-0 z-50 px-5 py-4 text-white shadow-md bg-slate-800 backdrop-blur-md'>
        <section className='flex items-center justify-between'>
            {/* Logo goes here */}
            <Link href={'/'} className='text-xl font-semibold text-cyan-600'>
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