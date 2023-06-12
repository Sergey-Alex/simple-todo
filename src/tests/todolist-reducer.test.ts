import {StateType, todolistReducers} from "../reducer/TodolistReducers";


test('correct todolist should be added', () => {
    const startState :StateType = {
        tasks: [],
        filter: "all"
    }

    const endState = todolistReducers(startState, {type: "ADD", title: 'Hello World'})

    expect(endState.tasks[0].title).toBe('Hello World')
    expect(endState.tasks[0].check).toBe(false)

})
