import React from 'react';
import {taskType} from "../reducer/TodolistReducers";
import {Checkbox} from "@mui/material";

type  PropsType = {
    task: taskType
    changeTaskStatus: (status: boolean, id: string) => void
}
const TodoListItem: React.FC<PropsType> = (props) => {

    return (
        <div>
            <div>
                <Checkbox checked={props.task.check}
                          inputProps={{'aria-labelledby': props.task.id}}
                          onChange={e => props.changeTaskStatus(e.currentTarget.checked, props.task.id)}/>
                <span >{props.task.title}</span>
            </div>
        </div>
    );
};

export default TodoListItem;
