import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "./storeConstants";

export const selectSinglePlayer = () => ({
    type: PLAYER_MODE.SINGLE_PLAYER
})

export const selectMultiPlayer = () => ({
    type: PLAYER_MODE.MULTI_PLAYER
})