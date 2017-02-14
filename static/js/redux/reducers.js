import { combineReducers } from 'redux'

function index(state={},action){
    switch (action.type){
        default:
            return state;
    }
}

export const CZW = combineReducers({
    index
});