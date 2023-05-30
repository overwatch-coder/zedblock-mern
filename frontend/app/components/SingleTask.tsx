'use client'

import React, {useContext} from 'react'
import Link from 'next/link'
import { ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im'
import { CreateTask, DeletedTask, Task } from '@/types'
import { toast } from 'react-toastify'
import { createTask, getTask } from '../utils'
import { AuthTodoContext } from '../context/authTodoContext'

type TaskProps = {
    task: Task,
    deleted?: boolean,
}

const Task = ({task, deleted}: TaskProps) => {
    const {user, setTasks, tasks, setDeletedTasks} = useContext(AuthTodoContext);

    const toggleCompleted = async (id?: string) => {
        const selectedTaskIndex = tasks?.findIndex(item => item._id === id);

        if (selectedTaskIndex !== -1) {
          const updatedTask = {
            ...tasks[selectedTaskIndex],
            completed: !tasks[selectedTaskIndex].completed,
          };
        
          const updatedTasks = [...tasks];
          updatedTasks[selectedTaskIndex] = updatedTask;
        
          setTasks(updatedTasks);

          const taskUpdate: CreateTask = {
              title: task.title,
              description: task.description,
              completed: updatedTask.completed,
              user
          }

          //update the completed state
          await createTask(taskUpdate, 'PATCH', id);

        }
    }

    const restoreDeletedTask = async () => {
        const result = await getTask(`${process.env.NEXT_PUBLIC_API_URI}/todos/${task._id}/restore`, user?.token);

        if(result?.todo?._id){

            setTasks((prev: Task[]) => ([result?.todo, ...prev]));

            setDeletedTasks(((prev: DeletedTask[]) => {
                const remaining = prev.filter(item => item.title !== result?.todo.title);

                return remaining;
            }));

            toast.success('undo deleted task was successfully');
        }
    }

  return (
    <div className='flex items-center justify-between space-x-4 bg-slate-300 py-2 px-4 rounded-sm'>

        {!deleted && 
        <div className='flex flex-col space-y-2'>
            <Link 
                href={`/tasks/${task._id}`}
                className={`font-medium hover:text-cyan-600 ${task.completed ? "line-through": ""}`}
            >
                {task.title}
            </Link>
            <small className='text-gray-500'>
                {
                (task.description && task.description?.length > 40) ? 
                    task.description?.slice(0,40) + '...'
                    : 
                    task.description
                }
            </small>
        </div>
        }
        
        {!deleted && 
        <button onClick={() => toggleCompleted(task._id)}>
            {task.completed ? 
            <ImCheckboxChecked 
                size={20} 
                color='green'
            /> : 
            <ImCheckboxUnchecked 
                size={20} 
                color='black'
            />}
        </button>}

        {deleted && 
            <h2 className='font-medium'>
                {task.title}
            </h2>
        }

        {deleted && 
            <button 
                onClick={restoreDeletedTask}
                className='bg-red-700 rounded px-4 py-2 text-white hover:bg-red-800'
            >
                Restore
            </button>
        }
    </div>
  )
}

export default Task