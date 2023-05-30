
export type User = {
    username: string,
    id: string,
    token: string
}

export type Task = {
    title: string,
    description: string,
    _id?: string,
    completed: boolean
}

export type CreateTask = {
    title: string,
    description: string,
    completed: boolean,
    user: User
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