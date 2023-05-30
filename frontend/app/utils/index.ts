import { Task } from "@/types";
import { toast } from "react-toastify";

export const getTask = async (url: string) => {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });
    
    if(!res.ok) {
        const error = await res.json();
        toast.error(error.message);
        throw new Error('Something went wrong!')
    };

    const tasks: Task[] = await res.json();
    
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

    console.log(result);

    if(!res.ok) return result;

    return result;
}