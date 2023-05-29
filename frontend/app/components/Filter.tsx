import Link from 'next/link'
import React from 'react'

const Filter = () => {
  return (
    <section className='flex flex-col space-y-5 border-b-2 border-gray-400 pb-7'>
        <section className='flex flex-col space-y-5 md:flex-row md:space-y-0 md:items-center justify-between'>
            {/* Search Bar */}
            <div className='flex flex-row items-center space-x-3'>
                <input 
                    type="search" 
                    className='w-full rounded px-4 py-2 border border-gray-400 focus:border-2 focus:outline-none' placeholder='search...' 
                />
            </div>

            {/* Filter & Sort */}
            <div className='flex flex-row items-center space-x-5 justify-between sm:justify-end md:justify-center'>
                <div className='flex flex-row items-center space-x-3'>
                    <label htmlFor="filter">Filter:</label>

                    <select 
                    name="filter" 
                    id="filter"
                    className='w-full p-2 rounded border border-gray-400 focus:outline-none'
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className='flex flex-row items-center space-x-2'>
                    <label htmlFor="filter">Sort:</label>

                    <select 
                    name="sort" 
                    id="sort"
                    className='w-full p-2 rounded border border-gray-400 focus:outline-none'
                    >
                        <option value="createdAt:asc">Added date: Asc</option>
                        <option value="createdAt:desc">Added date: Desc</option>
                        <option value="title:asc">Title: Asc</option>
                        <option value="title:desc">Title : Desc</option>
                    </select>
                </div>
            </div>
        </section>
        

        {/* add new task & delete completed task button */}
        <div className='flex items-center space-x-4 pt-5 justify-between sm:justify-end'>
            <Link 
                href={'/tasks/create'}
                className='bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2'
            >
                Add New Task
            </Link>

            <button className='bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2'>Remove Completed</button>
        </div>
    </section>
  )
}

export default Filter