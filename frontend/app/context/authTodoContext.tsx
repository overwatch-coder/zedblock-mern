'use client'

import { ContextValues, User } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState, useEffect } from "react"
import { ToastContainer } from "react-toastify";

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
    const router = useRouter();

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
        
        //navigate user to login page in not signed in
        if(user?.username){
            return router.push('/login');
        }
    }, [router, user?.username]);

    const values = {
        user,
        setUser,
        openMenu,
        setOpenMenu,
        toggleMenu
    }
  
    return (
        <AuthTodoContext.Provider value={values}>
            {children}
            <ToastContainer />
        </AuthTodoContext.Provider>
    )
}

export default AuthTodoProvider