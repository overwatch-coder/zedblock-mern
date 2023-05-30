
export type User = {
    username: string,
    id: string,
    token: string
}

export type Task = {
    title?: string,
    description?: string,
    _id?: string,
    completed?: boolean
}

export type CreateTask = {
    title?: string,
    description?: string,
    completed?: boolean,
    user: User
}

export type DeletedTask = {
    _id: string,
    title: string,
    description: string,
    completed: boolean,
    user: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export type ContextValues = {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    openMenu: boolean,
    setOpenMenu: Dispatch<SetStateAction<boolean>>,
    toggleMenu: () => void,
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    deletedTasks: DeletedTask[],
    setDeletedTasks: Dispatch<SetStateAction<DeletedTask[]>>,
}