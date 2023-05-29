
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

export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type ContextValues = {
    user?: User,
    setUser?: Dispatch<SetStateAction<User>>,
    openMenu?: boolean,
    setOpenMenu?: Dispatch<SetStateAction<boolean>>,
    toggleMenu?: () => void,
    tasks?: Task[],
    setTasks?: Dispatch<SetStateAction<Task[]>>
}