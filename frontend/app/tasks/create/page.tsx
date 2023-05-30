'use client'

import React, {useState, useContext} from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { AuthTodoContext } from '@/app/context/authTodoContext';
import { CreateTask, Task } from '@/types';
import { createTask } from '@/app/utils';

const AddTask = () => {
  const {user, setTasks} = useContext(AuthTodoContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if(!(user?.username)){
    setTimeout(() => {
      return router.push('/login')
    }, 0);
  };

  const createNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!title || !description){
      return setError('All fields are required!');
    }

    if(title.length > 50 || title.length < 15){
      return setError('Title length must be at most 50 chars but not less than 15')
    }

    if(description.length > 256 || description.length < 30){
      return setError('Description length must be at most 256 chars but not less than 30')
    }

    setError('');

    const task: CreateTask = {
      title,
      description,
      completed: false,
      user: {
        username: user.username,
        id: user.id,
        token: user.token
      }
    }

    const newTask = await createTask(task);

    const taskToAdd: Task = {
      _id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      completed: newTask.completed
    }
    setTasks((prev: Task[])=> [...prev, taskToAdd]);

    toast.success('new task created successfully');

    setTitle('');
    setDescription('');

    router.push('/');
}

  return (
    <section className='md:max-w-xl bg-slate-300 mx-auto my-10 p-5 flex flex-col space-y-6 shadow-md'>
      <h1 className='text-center text-xl font-medium uppercase'>Add New Task</h1>

      <form onSubmit={createNewTask} className='flex flex-col space-y-5'>

      {error && <p className='bg-red-200 text-red-500 p-4 rounded'>{error}</p>}

        <div className='flex flex-col space-y-2'>
          <label htmlFor="username">Title (max: 50 chars)</label>
          <input 
            type="text" 
            placeholder='title goes here...' 
            name='title'
            maxLength={50}
            className='p-2 rounded border-gray-500 border focus:outline-none focus:border-2 w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="password">Description: (max: 256 chars)</label>
          <textarea 
            name='description'
            maxLength={256}
            placeholder='description goes here...' 
            className='p-2 rounded border-gray-500 border focus:outline-none focus:border-2 w-full h-52'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type='submit' className='bg-green-600 hover:bg-green-700 rounded py-3 text-center text-white uppercase'>Add Task</button>
      </form>
    </section>
  )
}

export default AddTask