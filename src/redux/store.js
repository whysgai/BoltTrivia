import { createStore, combineReducers } from "redux";
import { gameStateReducer } from "./reducers/gameStateReducer"

export const rootReducer = combineReducers({
    gameStateReducer: gameStateReducer
});

export default createStore(rootReducer);