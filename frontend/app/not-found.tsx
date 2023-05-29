import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: '404 | Page Not Found - Bambora Ecommerce',
    description: 'Page Not Found',
  }

const NotFound = () => {
  return (
    <section className='flex flex-col items-center space-y-5 mt-10'>
        <h1 className='font-bold font-[georgia] text-6xl text-cyan-800'>404</h1>
        <h2 className='text-2xl font-semibold'>Page not found</h2>
        <p className='text-gray-600'>
            We are sorry, the page you requested could not be found.
        </p>
        <Link href={'/'} className='px-5 py-3 bg-slate-700 hover:bg-slate-900 text-white uppercase'>Go Home</Link>

    </section>
  )
}

export default NotFound