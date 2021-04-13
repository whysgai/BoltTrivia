import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";
import {SELECT_SINGLE_PLAYER_TYPE, SELECT_MULTI_PLAYER_TYPE} from "../actionConstants"

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
};

export const gameStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SINGLE_PLAYER_TYPE:
        return {
            ...state,
            phase: GAME_PHASE.SELECT_GAME_TYPE,
            multiSelect: PLAYER_MODE.SINGLE_PLAYER
        }
    case SELECT_MULTI_PLAYER_TYPE:
        return {
            ...state,
            phase: GAME_PHASE.SELECT_PLAYER,
            multiSelect: PLAYER_MODE.MULTI_PLAYER
        }
    default:
      return state;
  }
};
