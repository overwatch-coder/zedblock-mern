import { CreateTask } from "@/types";
import { toast } from "react-toastify";

export const getTask = async (url: string, token: string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if(!res.ok) {
        const error = await res.json();
        toast.success(error.message);
        throw new Error('Something went wrong!')
    };

    const tasks = await res.json();
    
    return tasks;
}

export const registerOrLoginUser = async (username: string, password: string, endpoint: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const result = await res.json();

    if(!res.ok) return result;

    return result;
}

export const createTask = async (task: CreateTask, method: string = 'POST', id: string = "") => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/todos/${id}`, {
        method: method,
        headers: {
            'authorization': `Bearer ${task.user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    
    if(!res.ok){
        const error = await res.json()
        toast.error(error.message); 
        throw new Error(error.message);
    }

    const newTask = await res.json();

    return newTask.todo;
}