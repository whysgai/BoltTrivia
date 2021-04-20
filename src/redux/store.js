import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { gameStateReducer } from "./reducers/gameStateReducer"
import { SPQuestionReducer } from "./reducers/SPQuestionReducer";
import { MPQuestionReducer } from "./reducers/MPQuestionReducer";

export const rootReducer = combineReducers({
    gameStateReducer: gameStateReducer,
    SPQuestionReducer: SPQuestionReducer,
    MPQuestionReducer: MPQuestionReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));