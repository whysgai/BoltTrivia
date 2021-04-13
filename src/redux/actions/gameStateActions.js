import {SINGLE_PLAYER, MULTI_PLAYER} from "../actionConstants"
import { selectMultiplayerMode } from "../../client";

export const selectSinglePlayer = () => ({
    type: SINGLE_PLAYER
})

export const connectMultiPlayerMode = () => {
    return dispatch => {
        selectMultiplayerMode(() => {
            dispatch(selectMultiPlayer());
        });
    }
}

export const selectMultiPlayer = () => ({
    type: MULTI_PLAYER
})