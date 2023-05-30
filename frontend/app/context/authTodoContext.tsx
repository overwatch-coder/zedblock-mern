'use client'

import { ContextValues, Task, User } from "@/types";
import { createContext, ReactNode, useState, useEffect } from "react"
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AuthTodoContext =  createContext<ContextValues>({})

type AuthTodoContextProps = {
    children: ReactNode
}

const AuthTodoProvider = ({children}: AuthTodoContextProps) => {
    const [user, setUser] = useState<User>({
        username: "",
        id: ""
    });
    const [openMenu, setOpenMenu] = useState(false);
    const [tasks, setTasks] = useState<Task[]>()

    const toggleMenu = () => {
        setOpenMenu(prev => !prev);
    }


    useEffect(() => {
        
        //check if client is done loading
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const storageUser = localStorage.getItem('user');
            const result: User = storageUser ? JSON.parse(storageUser) : {
                username: "",
                id: ""
            }
            
            setUser(result);
        }
    }, []);

    const values = {
        user,
        setUser,
        openMenu,
        setOpenMenu,
        toggleMenu,
        tasks,
        setTasks
    }
  
    return (
        <AuthTodoContext.Provider value={values}>
            <ToastContainer />
            {children}
        </AuthTodoContext.Provider>
    )
}

export default AuthTodoProvider