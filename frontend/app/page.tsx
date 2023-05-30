'use client'

import Link from 'next/link';
import React, {useContext, useEffect, useState} from 'react'
import Filter from './components/Filter';
import SingleTask from './components/SingleTask';
import { getTask } from './utils';
import { DeletedTask, Task } from '@/types';
import { useRouter } from 'next/navigation';
import { AuthTodoContext } from './context/authTodoContext';

const Home = () => {
  const {tasks, setTasks, user, setDeletedTasks, deletedTasks} = useContext(AuthTodoContext);
  const router = useRouter();

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if(!user?.username) return router.push('/login');
  }, [router, user?.username]);

  useEffect(() => {

    const fetchAllTasks = async () => {
      const results = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos`, user?.token);
      setTasks(results?.todos?.todos || []);
      setDeletedTasks(results?.deletedTodos);
    }

    fetchAllTasks();
  }, [setTasks, user?.token, setDeletedTasks]);

  return (
    <section className='flex flex-col space-y-5 py-10 w-full md:max-w-4xl mx-auto bg-slate-200 shadow-md p-10'>

      {/* Filter, Sort, Action Menu & Search Component */}
      <Filter 
        filter={filter}
        setFilter={setFilter}
      />

      {/* display all tasks */}
      {((tasks?.length > 0 ) || (deletedTasks?.length > 0 ) ) ? (
        <>
        {/* Filter Component */}
          {/* <Filter /> */}

          {/* Display Tasks */}
          <section className='flex flex-col space-y-6'>
            <h2 className='font-semibold font-[georgia] text-2xl py-4'>
              {!tasks?.length ? 'No tasks available' : `${filter} Tasks`}
            </h2>

            {tasks?.map((task: Task) => (
              <SingleTask 
                key={task._id} 
                task={task}
              />
            ))}
          </section>

          {deletedTasks?.length > 0 && 
            <section>
              <h2 className='font-semibold font-[georgia] text-2xl py-4 mt-10 text-red-600'>
                Deleted tasks
              </h2>

              <div className='flex flex-col space-y-4'>
                {deletedTasks?.map((task: Task) => (
                    <SingleTask 
                      key={task._id} 
                      task={task}
                      deleted={true}
                    />
                  ))}
                </div>
            </section>
          }
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