import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-center text-white py-5 mt-16'>
        <p className='text-sm'>Copyright &copy; {new Date().getFullYear()} ZedTodo</p>
    </footer>
  )
}

export default Footer