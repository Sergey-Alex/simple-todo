import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from "react";
import TodoListItem from "./components/TodoListItem";
import {
    addTodolistAC,
    checkedTaskAC,
    clearAC,
    filterChangeAC,
    FilterValuesType,
    StateType,
    todolistReducers
} from "./reducer/TodolistReducers";
import {Button, Card, TextField} from "@mui/material";


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
        <Card  sx={{ display: 'inline-block', mx: '200px', height: "auto", padding:'20px' }} >
            <TextField error={!!error}
                       label='Press enter' value={value} onChange={onChangeHandler}
                   onKeyPress={keyPressHandler}/>
            {filteredTasks.map(task => {
                return (<TodoListItem
                        key = {task.id}
                        task={task}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
            <div>
                <Button variant={todolist.filter === 'all' ? 'outlined':'text'}
                        onClick={() => changeTaskFilter('all')}>All</Button>
                <Button variant={todolist.filter === 'active' ? 'outlined':'text'}
                        onClick={() => changeTaskFilter('active')}>Active</Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined':'text'}
                        onClick={() => changeTaskFilter('completed')}>Completed</Button>
                <Button variant={todolist.filter === 'clear' ? 'contained':'text'}
                        onClick={clearTasksStatuses}>Clear completed</Button>
            </div>

        </Card>
    )

}
