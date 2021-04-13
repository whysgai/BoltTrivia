import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
};

export const gameStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_MODE.SINGLE_PLAYER:
        return {
            ...state,
            //player:
            phase: GAME_PHASE.SELECT_GAME_TYPE,
            multiSelect: PLAYER_MODE.SINGLE_PLAYER
        }
    default:
      return state;
  }
};
