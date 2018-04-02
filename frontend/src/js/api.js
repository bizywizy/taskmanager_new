import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api';

export async function getTaskList() {
    const response = await axios.get(baseUrl + '/tasks');
    return response.data
}

export async function createTask(text) {
    const response = await axios.post(baseUrl + '/tasks', { text: text });
    return response.data
}

export async function updateTask(task) {
    const response = await axios.put(baseUrl + '/tasks/' + task.id, task);
    return response.data
}

export async function deleteTask(task) {
    await axios.delete(baseUrl + '/tasks/' + task.id);
}