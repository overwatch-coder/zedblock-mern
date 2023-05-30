'use client'

import Link from 'next/link'
import React, {useContext, useState} from 'react'
import { AuthTodoContext } from '../context/authTodoContext'
import { CreateTask, Task } from '@/types'
import { createTask, getTask } from '../utils'
import { toast } from 'react-toastify'

type FilterProps = {
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({filter, setFilter}: FilterProps) => {
    const {tasks, setTasks, setDeletedTasks, user} = useContext(AuthTodoContext);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt:desc');

    // Filter tasks by search value function
    const handleSearchTask = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearch(inputValue);

        // If search input is empty, return all tasks
        const results = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos`, user?.token);

        if (inputValue.trim() === '') {

            setTasks(results?.todos?.todos || []);

        } else {
            // Filter tasks based on search input
            const filteredTasks = results?.todos?.todos.filter(
            (item: Task) =>
                item.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
                item.description?.toLowerCase().includes(inputValue.toLowerCase())
            );

            setTasks(filteredTasks);
        }
    }

    
    //bulk delete completed tasks
    const bulkDeleteTasks = () => {
        if(tasks?.length > 0){
            const allCompletedTasks = tasks?.filter((item: Task) => item.completed === true);

            const remainingTasks = tasks?.filter((item: Task) => item.completed === false);

            allCompletedTasks?.map((completedTask) => {
                const deleteCompletedTask = async () => {
                    const fakeTask: CreateTask = {
                        title: "",
                        description: "",
                        completed: false,
                        user: user
                    }
                    
                    await createTask(fakeTask, 'DELETE', completedTask._id);
                }

                deleteCompletedTask();
            })

            toast.success('no more completed task left');

            setTasks(remainingTasks);

            setDeletedTasks((prev: Task[])=> [...prev, ...allCompletedTasks]);
        }
    }

    //filter tasks based on it's state - All, Active, Completed
    const filterTasks = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);

        const results = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos`, user?.token);
        const allTasks: Task[] = results?.todos?.todos;

        switch (e.target.value) {
            case 'Active':
                const activeTasks = allTasks.filter(item => item.completed === false);
                setTasks(activeTasks);
                break;
            case 'Completed':
                const completedTasks = allTasks.filter(item => item.completed === true);
                setTasks(completedTasks);
                break;
            default:
                setTasks(allTasks);
                break;
        }
    }

    //sort tasks based on time of creation or title in asc or desc
    const sortAllTasks = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);

        const results = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos?sortBy=${e.target.value}`, user?.token);

        const allTasks: Task[] = results?.todos?.todos;

        setTasks(allTasks);
    }

  return (
    <section className='flex flex-col space-y-5 border-b-2 border-gray-400 pb-7'>
        <section className='flex flex-col space-y-5 md:flex-row md:space-y-0 md:items-center justify-between'>
            {/* Search Bar */}
            <div className='flex flex-row items-center space-x-3'>
                <input 
                    type="search" 
                    value={search}
                    className='w-full rounded px-4 py-2 border border-gray-400 focus:border-2 focus:outline-none' placeholder='search...'
                    onChange={handleSearchTask} 
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
                        value={filter}
                        onChange={filterTasks}
                    >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className='flex flex-row items-center space-x-2'>
                    <label htmlFor="filter">Sort:</label>

                    <select 
                        name="sort" 
                        id="sort"
                        className='w-full p-2 rounded border border-gray-400 focus:outline-none'
                        value={sort}
                        onChange={sortAllTasks}
                    >
                        <option value="createdAt:desc">Added date: Asc</option>
                        <option
                        value="createdAt:asc">Added date: Desc</option>
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

            <button 
                onClick={bulkDeleteTasks}
                className='bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2'
            >
                Remove Completed
            </button>
        </div>
    </section>
  )
}

export default Filter