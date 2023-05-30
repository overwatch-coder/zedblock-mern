import React from 'react'
import Link from 'next/link'
import { ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im'
import { Task } from '@/types'

type TaskProps = {
    task: Task
}

const Task = ({task}: TaskProps) => {
  return (
    <div className='flex items-center justify-between space-x-4 bg-slate-300 py-2 px-4 rounded-sm'>
        <Link 
            href={`/tasks/${task.id}`}
            className={`font-medium hover:text-cyan-600 ${task.completed ? "line-through": ""}`}
        >
            {task.title}
        </Link>
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
        </button>
    </div>
  )
}

export default Task