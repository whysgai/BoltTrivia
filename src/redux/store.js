import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { gameStateReducer } from "./reducers/gameStateReducer"
import { questionReducer } from "./reducers/SPQuestionReducer";

export const rootReducer = combineReducers({
    gameStateReducer: gameStateReducer,
    questionReducer: questionReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));