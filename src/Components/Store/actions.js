import axios from 'axios';
export const FETCH_DATA = 'FETCH_DATA';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const STORE_DATA = 'STORE_DATA';
export const SET_TOTAL_TASKS_COUNT = 'SET_TOTAL_TASKS_COUNT';
export const SET_PAGE_NUM = 'SET_PAGE_NUM';
export const SAVE_DATA = 'SAVE_DATA';

export const saveData = (res) => {
    return {
        type: SAVE_DATA,
        payload: res
    }
}
export const setTotalTaskCount = (count) => {
    return {
        type: SET_TOTAL_TASKS_COUNT,
        payload: count
    }
}

export const fetchData = (pageNum = 0) => dispatch => {
    axios.get('https://uxcandy.com/~shapoval/test-task-backend/?developer=Sergey', { params: { page: pageNum } })
        .then(result => {
            dispatch(saveData(result.data.message.tasks))
            dispatch(setTotalTaskCount(Number(result.data.message.total_task_count)))
        })
        .catch(err => {
            console.log(err);
        })
}