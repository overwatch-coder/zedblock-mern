
export type User = {
    username: string,
    id: string
}

export type Task = {
    title: string,
    description: string,
    id: string,
    completed: boolean
}

export type ContextValues = {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    openMenu: boolean,
    setOpenMenu: Dispatch<SetStateAction<boolean>>,
    toggleMenu: () => void,
    tasks: Task[] | undefined,
    setTasks: Dispatch<SetStateAction<Task[]>>
}