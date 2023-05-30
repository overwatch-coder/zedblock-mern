import React from 'react'
import Link from 'next/link'
import { ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im'
import { Task } from '@/types'

type TaskProps = {
    task: Task,
    deleted?: boolean
}

const Task = ({task, deleted}: TaskProps) => {
  return (
    <div className='flex items-center justify-between space-x-4 bg-slate-300 py-2 px-4 rounded-sm'>
        {!deleted && <Link 
            href={`/tasks/${task._id}`}
            className={`font-medium hover:text-cyan-600 ${task.completed ? "line-through": ""}`}
        >
            {task.title}
        </Link>}
        {!deleted && 
        <button>
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

        {deleted && <h2 className='font-medium'>{task.title}</h2>}

        {deleted && <button className='bg-red-700 rounded px-4 py-2 text-white hover:bg-red-800'>Restore</button>}
    </div>
  )
}

export default Task