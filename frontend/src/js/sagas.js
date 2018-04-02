import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as api from "./api";
import {
    successListTask,
    failListTask,
    successCreateTask,
    failCreateTask,
    successUpdateTask,
    failUpdateTask,
    successDeleteTask,
    failDeleteTask
} from './actions';
import { LIST_TASK_REQUEST, CREATE_TASK_REQUEST, UPDATE_TASK_REQUEST, DELETE_TASK_REQUEST } from './actionTypes';


function* getTaskList(action) {
    try {
        const tasks = yield call(api.getTaskList);
        yield put(successListTask(tasks));
    } catch (e) {
        yield put(failListTask(e));
    }
}

function* createTask(action) {
    try {
        const task = yield call(api.createTask, action.text);
        yield put(successCreateTask(task, action.clearCallback));
    } catch (e) {
        console.log(e);
        yield put(failCreateTask(e));
    }
}

function* updateTask(action) {
    try {
        const task = yield call(api.updateTask, action.task);
        yield put(successUpdateTask(task));
    } catch (e) {
        console.log(e);
        yield put(failUpdateTask(e));
    }
}

function* deleteTask(action) {
    try {
        yield call(api.deleteTask, action.task);
        yield put(successDeleteTask(action.task));
    } catch (e) {
        console.log(e);
        yield put(failDeleteTask(e));
    }
}


function* TaskListSaga() {
    yield takeEvery(LIST_TASK_REQUEST, getTaskList)
    yield takeLatest(CREATE_TASK_REQUEST, createTask)
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask)
    yield takeLatest(DELETE_TASK_REQUEST, deleteTask)
}

export default TaskListSaga;