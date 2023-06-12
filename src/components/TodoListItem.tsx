import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, StateType, taskType} from "../reducer/TodolistReducers";

type  PropsType = {
    addTask: (value: string) => void
    task: taskType
    changeTaskStatus: (status: boolean, id: string) => void
    changeTaskFilter: (filter: FilterValuesType) => void
}
const TodoListItem: React.FC<PropsType> = (props) => {
    const [value, setValue] = useState<string>('')



    return (
        <div>

            <div>
                    <input type="checkbox" checked={props.task.check}
                           onChange={e => props.changeTaskStatus(e.currentTarget.checked, props.task.id)}/>
                </div>
                {props.task.title}

        </div>
    );
};

export default TodoListItem;
