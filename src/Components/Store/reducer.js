import * as actionTypes from './actions';
import { updateObject } from './utility';
const initialState = {
    tasks: null,
    totalTaskCount: 0,
    pageNum: 0,
    authenticated: false,
    showModal: false,

    showLoginForm: true,
    showEditTaskForm: false,
    taskId: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //case actionTypes.ADD_TASK: return addTask(state, action.payload)
        case actionTypes.SET_TOTAL_TASKS_COUNT:
            return updateObject(state, { totalTaskCount: action.payload })
        case actionTypes.SAVE_DATA:
            return updateObject(state, { tasks: action.payload })
        case actionTypes.SET_PAGE_NUM:
            return updateObject(state, { pageNum: action.payload })
        case actionTypes.AUTHENTICATE:
            return updateObject(state, { authenticated: action.payload })
        case actionTypes.SHOW_MODAL:
            return updateObject(state, { showModal: action.payload })
        case actionTypes.SET_TASK_ID:
            return updateObject(state, { taskId: action.payload })
        default: return state;
    }
}
export default reducer;