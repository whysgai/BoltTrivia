import {SELECT_SINGLE_PLAYER_TYPE, SELECT_MULTI_PLAYER_TYPE} from "../actionConstants"
import { selectMultiplayerMode } from "../../client";
import { useDispatch } from "react-redux";

export const connectSinglePlayerMode = () => ({
    type: SELECT_SINGLE_PLAYER_TYPE
})

export const connectMultiPlayerMode = () => {
    return dispatch => {
        dispatch(selectMultiPlayer());
        selectMultiplayerMode();
    }
}

export const selectMultiPlayer = () => ({
    type: SELECT_MULTI_PLAYER_TYPE
})