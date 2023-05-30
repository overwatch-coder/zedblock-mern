'use client'

import { AuthTodoContext } from '@/app/context/authTodoContext';
import { createTask} from '@/app/utils';
import { CreateTask } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, {useContext, useEffect} from 'react'
import { toast } from 'react-toastify';

const TaskDetails = ({params: {id}}: {params: {id: string}}) => {

  const {user, tasks} = useContext(AuthTodoContext);
  const router = useRouter();

  const singleTask = tasks?.filter(item => item._id === id);

  useEffect(() => {
    
    if(!(user?.username)){
      setTimeout(() => {
        return router.push('/')
      }, 0);
    };

  }, [router, user?.username])

  const handleDeleteTask = async () => {
    const fakeTask: CreateTask = {
      title: "",
      description: "",
      completed: false,
      user: user
    }

    await createTask(fakeTask, 'DELETE', id);

    router.push('/');

    toast.success('task deleted successfully');

  }

  return (
    <div className='mx-5'>
      <section className='flex flex-col space-y-7 mt-20 py-10 w-full md:max-w-xl mx-auto shadow-md rounded-md bg-slate-700 text-white p-10'>
        <h2 className='text-center font-medium'>
          Task detail # {id}
        </h2>

        <h3 className='border-b-[1px] border-white/60 pb-4'>
          {singleTask && singleTask[0]?.title}
        </h3>

        <h4 className=''>
          {singleTask && singleTask[0]?.description}
        </h4>

        <h4 className=' flex space-x-3'>
          <span>Status:</span> 
          <span>
            {singleTask && singleTask[0].completed ? 'Completed': 'Active'}
            </span>
        </h4>

        <div className='flex justify-between items-center mt-5'>
          <button 
            className='bg-red-600 hover:bg-red-700 rounded px-4 py-2 uppercase'
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>

          <Link 
            href={`tasks/${id}/edit`}
            className='bg-green-600 hover:bg-green-700 rounded px-4 py-2 uppercase'
          >
            Edit Task
          </Link>
        </div>
      </section>
    </div>
  )
}

export default TaskDetails