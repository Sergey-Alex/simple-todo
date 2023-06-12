import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed" | 'clear';
export type StateType = {
    tasks: taskType[]
    filter: FilterValuesType
}

export type taskType = {
    id: string
    title: string
    check: boolean
}
export type ActionType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof checkedTaskAC>
    | ReturnType<typeof filterChangeAC>
    | ReturnType<typeof clearAC>
export const todolistReducers = (state: StateType, action: ActionType): StateType => {

    switch (action.type) {
        case "ADD":
            return {
                ...state,
                tasks: [...state.tasks, {id: v1(), check: false, title: action.title}],
                filter: 'all'
            }
        case 'CHECK':
            return {
                ...state,
                tasks: state.tasks.map(tl => tl.id === action.id ? {...tl, check: action.check} : tl)
            }
        case "FILTER":
            return {
                ...state,
                filter: action.filter
            }
        case "CLEAR" :
            return  {...state, tasks: state.tasks.map(task => ({...task, check: false}))}
        default:
            return state
    }
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD', title} as const
}
export const checkedTaskAC = (check: boolean, id: string) => {
    return {type: 'CHECK', check, id} as const
}
export const filterChangeAC = (filter: FilterValuesType) => {
    return {type: 'FILTER', filter} as const
}
export const clearAC = () => {
    return {type: 'CLEAR'} as const
}
