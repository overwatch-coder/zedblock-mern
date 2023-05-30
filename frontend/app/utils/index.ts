import { TodoType } from "@/types";

export const getTask = async (url: string) => {
    const res = await fetch(url, {next: {revalidate: 60}});

    if(!res.ok) throw new Error('Something went wrong!');
    
    const todos: TodoType[] = await res.json();
    return todos;
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