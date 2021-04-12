import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
};

export const gameStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //case GAME_PHASE.SELECT_MULTI:

    default:
      return state;
  }
};
