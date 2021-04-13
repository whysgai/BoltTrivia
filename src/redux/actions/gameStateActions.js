import {SINGLE_PLAYER, MULTI_PLAYER} from "../actionConstants"
import { selectMultiplayerMode } from "../../client";
import { useDispatch } from "react-redux";

export const connectSinglePlayerMode = () => ({
    type: SINGLE_PLAYER
})

export const connectMultiPlayerMode = () => {
    return dispatch => {
        dispatch(selectMultiPlayer());
        selectMultiplayerMode();
    }
}

export const selectMultiPlayer = () => ({
    type: MULTI_PLAYER
})