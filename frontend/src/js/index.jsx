import React from 'react'
import ReactDOM from 'react-dom'
import TaskList from "./components/task-list";
import taskManager from "./reducers"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from 'redux-saga'
import TaskListSaga from './sagas';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(taskManager,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(TaskListSaga);

ReactDOM.render(
    <Provider store={store}>
        <TaskList />
    </Provider>,
    document.getElementById('root')
);