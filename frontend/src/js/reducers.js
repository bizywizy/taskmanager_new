import { combineReducers } from 'redux';

import * as types from './actionTypes'

function movePositions(tasks, prevPosition, curPosition) {
    if (prevPosition === curPosition) return tasks;
    const offset = prevPosition > curPosition ? 1 : -1;
    const toMove = position => {
        return position <= Math.max(prevPosition, curPosition) && position >= Math.min(prevPosition, curPosition)
    };
    return tasks.map(task => {
        if (toMove(task.position)) {
            return Object.assign({}, task, { position: task.position + offset });
        }
        return task;
    })
}

function todos(state = [], action) {
    switch (action.type) {
        case types.LIST_TASK_SUCCESS:
            return [
                ...action.tasks
            ]
        case types.LIST_TASK_FAIL:
            alert(action.error);
            return state;
        case types.CREATE_TASK_SUCCESS:
            let maxPosition = 0;
            if (state.length > 0) maxPosition = Math.max(...state.map(task => task.position));
            action.clearCallback();
            return [
                {
                    id: action.task.id,
                    text: action.task.text,
                    position: maxPosition + 1
                },
                ...state
            ];
        case types.CREATE_TASK_FAIL:
            alert(action.error);
            return state;
        case types.UPDATE_TASK_SUCCESS:
            let prevPosition = state.find(task => task.id == action.task.id).position;
            let moved = movePositions(state, prevPosition, action.task.position);
            return moved.map(todo => {
                if (todo.id === action.task.id) {
                    return Object.assign({}, todo, action.task);
                }
                return todo;
            });
        case types.UPDATE_TASK_FAIL:
            alert(action.error);
            return state;
        case types.DELETE_TASK_SUCCESS:
            let curPosition = Math.max(...state.map(task => task.position));
            prevPosition = state.find(task => task.id == action.task.id).position;
            moved = movePositions(state, prevPosition, curPosition);
            return moved.filter(task => task.id !== action.task.id);
        case types.DELETE_TASK_FAIL:
            alert(action.error);
            return state;
        default:
            return state;
    }
}

const taskManager = combineReducers({
    todos
});

export default taskManager;