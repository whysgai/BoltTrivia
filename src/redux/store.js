import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { gameStateReducer } from "./reducers/gameStateReducer"

export const rootReducer = combineReducers({
    gameStateReducer: gameStateReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));