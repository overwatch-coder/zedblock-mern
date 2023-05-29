import Link from 'next/link';
import React from 'react'
import Filter from './components/Filter';
import Task from './components/Task';
import { getTask } from './utils';
import { TodoType } from '@/types';

const Home = async () => {
  const tasks: TodoType[] = await getTask('https://jsonplaceholder.typicode.com/todos');

  return (
    <section className='flex flex-col space-y-5 py-10 w-full md:max-w-4xl mx-auto bg-slate-200 shadow-md p-10'>

      {/* display all tasks */}
      {(tasks.length > 0 ) ? (
        <>
        {/* Filter Component */}
          <Filter />

          {/* Display Tasks */}
          <section className='flex flex-col space-y-6'>
            <h2 className='font-semibold font-[georgia] text-2xl py-4'>All Tasks</h2>

            {tasks.map(task => (
              <Task 
                key={task.id} 
                task={task}
              />
            ))}
          </section>
        </>
      ) : (
        <div className='text-center flex flex-col space-y-7 items-center py-10'>
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