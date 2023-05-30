'use client'

import Link from 'next/link';
import React, {useContext, useEffect} from 'react'
import Filter from './components/Filter';
import SingleTask from './components/SingleTask';
import { getTask } from './utils';
import { Task } from '@/types';
import { useRouter } from 'next/navigation';
import { AuthTodoContext } from './context/authTodoContext';

const Home = () => {
  const {tasks, setTasks, user} = useContext(AuthTodoContext);
  const router = useRouter();

  useEffect(() => {
    if(!user?.username) return router.push('/login');

    const fetchAllTasks = async () => {
      const results = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos`);
      
      setTasks(results);
    }

    fetchAllTasks();
  }, [setTasks, router, user?.username]);


  return (
    <section className='flex flex-col space-y-5 py-10 w-full md:max-w-4xl mx-auto bg-slate-200 shadow-md p-10'>
      {/* display all tasks */}
      {(tasks && tasks.length > 0 ) ? (
        <>
        {/* Filter Component */}
          <Filter />

          {/* Display Tasks */}
          <section className='flex flex-col space-y-6'>
            <h2 className='font-semibold font-[georgia] text-2xl py-4'>All Tasks</h2>

            {tasks?.map((task: Task) => (
              <SingleTask 
                key={task.id} 
                task={task}
              />
            ))}
          </section>
        </>
      ) : (
        <div className='text-center flex flex-col space-y-7 items-center py-10 mx-auto'>
          <h2 className='text-3xl font-medium'>No tasks available</h2>

          <Link 
            href={'/tasks/create'} 
            className='bg-green-600 text-white px-5 py-3 rounded uppercase hover:bg-green-700 w-40'
          >
            Add new Task
          </Link>
        </div>
      )}
    </section>
  )
}

export default Home