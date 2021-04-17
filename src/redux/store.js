import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { gameStateReducer } from "./reducers/gameStateReducer"
import { SPQuestionReducer } from "./reducers/SPQuestionReducer";

export const rootReducer = combineReducers({
    gameStateReducer: gameStateReducer,
    SPQuestionReducer: SPQuestionReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));