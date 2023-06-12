import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from "react";
import TodoListItem from "./components/TodoListItem";
import {
    addTodolistAC,
    checkedTaskAC, clearAC,
    filterChangeAC,
    FilterValuesType,
    StateType,
    todolistReducers
} from "./reducer/TodolistReducers";


export const App = () => {
    const InitialState: StateType = {tasks: [], filter: 'all'}
    const [todolist, dispatchTodo] = useReducer(todolistReducers, InitialState)
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskStatus = (status: boolean, id: string) => {
        dispatchTodo(checkedTaskAC(status, id))
    }
    const changeTaskFilter = (filter: FilterValuesType) => {
        dispatchTodo(filterChangeAC(filter))
    }
    const clearTasksStatuses = () => {
        dispatchTodo(clearAC())
    }
    const addTask = () => {
        if (value.trim() !== "") {
            dispatchTodo(addTodolistAC(value))
            setValue('')
        } else {
            setError("Title is required");
        }
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    let filteredTasks = todolist.tasks

    if (todolist.filter === 'active') {
        filteredTasks = todolist.tasks.filter(t => !t.check)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = todolist.tasks.filter(t => t.check)
    }
    return (
        <div>
            <input value={value} onChange={onChangeHandler}
                   onKeyPress={keyPressHandler}/>
            {filteredTasks.map(task => {
                return (<TodoListItem
                        key = {task.id}
                        addTask={addTask}
                        task={task}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskFilter={changeTaskFilter}
                    />
                )
            })}
            <button onClick={() => changeTaskFilter('all')}>All</button>
            <button onClick={() => changeTaskFilter('active')}>Active</button>
            <button onClick={() => changeTaskFilter('completed')}> Completed</button>
            <button onClick={clearTasksStatuses}>Clear completed</button>
        </div>
    )

}
