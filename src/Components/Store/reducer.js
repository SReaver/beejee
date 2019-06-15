import * as actionTypes from './actions';
import { updateObject } from './utility';
const initialState = {
    tasks: null,
    totalTaskCount: 0
}

const addTask = (state, action) => {
    // const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    // const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    // const updatedState = {
    //     ingredients: updatedIngredients,
    //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    //     building: true
    // }
    //return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TASK: return addTask(state, action.payload)
        case actionTypes.SET_TOTAL_TASKS_COUNT:
            return updateObject(state, { totalTaskCount: action.payload })
        case actionTypes.SAVE_DATA:
            return updateObject(state, { tasks: action.payload })
        default: return state;
    }
}
export default reducer;