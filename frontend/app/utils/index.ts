import { TodoType } from "@/types";

export const getTask = async (url: string) => {
    const res = await fetch(url, {next: {revalidate: 60}});

    if(!res.ok) throw new Error('Something went wrong!');
    
    const todos: TodoType[] = await res.json();
    return todos;
}