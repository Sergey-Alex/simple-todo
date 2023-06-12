import {StateType, todolistReducers} from "../reducer/TodolistReducers";
import {v1} from "uuid";


test('todolist should be added task', () => {
    const startState :StateType = {
        tasks: [],
        filter: "all"
    }

    const endState = todolistReducers(startState, {type: "ADD", title: 'Hello World'})

    expect(endState.tasks[0].title).toBe('Hello World')
    expect(endState.tasks[0].check).toBe(false)
    expect(endState.filter).toBe('all')
    expect(endState.tasks.length).toBe(1)

})
test('task status change checked', () => {
    let id1 = v1()
    let id2 = v1()
    const startState :StateType = {
        tasks: [
            {id: id1, title:'1', check: false},
            {id: id2, title:'2', check: false}],
        filter: "all"
    }

    const endState = todolistReducers(startState, {type: "CHECK",check: true, id: id1})

    expect(endState.tasks[0].check).toBe(true)
    expect(endState.tasks[1].check).toBe(false)
    expect(endState.filter).toBe('all')
    expect(endState.tasks.length).toBe(2)

})

test('todolist filter should be changed', () => {
    const startState :StateType = {
        tasks: [],
        filter: "all"
    }

    const endState = todolistReducers(startState, {type: "FILTER", filter: "active"})


    expect(endState.filter).toBe('active')
    expect(endState.tasks.length).toBe(0)

})


