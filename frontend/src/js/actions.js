import * as types from './actionTypes'

export const requestListTask = () => ({ type: types.LIST_TASK_REQUEST });
export const successListTask = tasks => ({ type: types.LIST_TASK_SUCCESS, tasks: tasks });
export const failListTask = error => ({ type: types.LIST_TASK_FAIL, error: error });

export const requestCreateTask = (text, clearCallback) => ({ type: types.CREATE_TASK_REQUEST, text, clearCallback });
export const successCreateTask = (task, clearCallback) => ({ type: types.CREATE_TASK_SUCCESS, task, clearCallback});
export const failCreateTask = error => ({ type: types.CREATE_TASK_FAIL, error: error });

export const requestUpdateTask = task => ({ type: types.UPDATE_TASK_REQUEST, task: task });
export const successUpdateTask = task => ({ type: types.UPDATE_TASK_SUCCESS, task: task });
export const failUpdateTask = error => ({ type: types.UPDATE_TASK_FAIL, error: error });

export const requestDeleteTask = task => ({ type: types.DELETE_TASK_REQUEST, task });
export const successDeleteTask = task => ({ type: types.DELETE_TASK_SUCCESS, task });
export const failDeleteTask = error => ({ type: types.DELETE_TASK_FAIL, error: error });
