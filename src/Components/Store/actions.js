import axios from 'axios';
export const FETCH_DATA = 'FETCH_DATA';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const STORE_DATA = 'STORE_DATA';
export const SET_TOTAL_TASKS_COUNT = 'SET_TOTAL_TASKS_COUNT';
export const SET_PAGE_NUM = 'SET_PAGE_NUM';
export const SAVE_DATA = 'SAVE_DATA';
export const SET_SORTING_DIRECTION = 'SET_SORTING_DIRECTION';
export const SET_SORTING_PARAM = 'SET_SORTING_PARAM';

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

export const setPageNum = (pageNum) => {
    return {
        type: SET_PAGE_NUM,
        payload: pageNum
    }
}
export const setSortDirection = (method) => {
    return {
        type: SET_SORTING_DIRECTION,
        payload: method
    }
}
export const setSortParam = (param) => {
    return {
        type: SET_SORTING_PARAM,
        payload: param
    }
}

export const fetchData = (sort_field, sort_direction, pageNum = 0) => dispatch => {
    axios.get('https://uxcandy.com/~shapoval/test-task-backend/?developer=Sergey', { params: { page: pageNum, sort_field: sort_field, sort_direction: sort_direction } })
        .then(result => {
            dispatch(setTotalTaskCount(Number(result.data.message.total_task_count)));
            dispatch(saveData(result.data.message.tasks));
            dispatch(setPageNum(pageNum));
            //console.log(result.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}
export const addTask = (data) => dispatch => {
    axios.post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Sergey', data)
        .then(result => {
            console.log(result.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}