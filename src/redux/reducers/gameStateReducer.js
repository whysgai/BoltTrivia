import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";
import {SINGLE_PLAYER, MULTI_PLAYER} from "../actionConstants"

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
};

export const gameStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SINGLE_PLAYER:
        return {
            ...state,
            phase: GAME_PHASE.SELECT_GAME_TYPE,
            multiSelect: PLAYER_MODE.SINGLE_PLAYER
        }
    case MULTI_PLAYER:
        console.log('test')
        return {
            ...state,
            phase: GAME_PHASE.SELECT_PLAYER,
            multiSelect: PLAYER_MODE.MULTI_PLAYER
        }
    default:
      return state;
  }
};
