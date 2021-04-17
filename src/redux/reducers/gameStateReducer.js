import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";
import { SELECT_SINGLE_PLAYER_TYPE, SELECT_MULTI_PLAYER_TYPE, SELECT_PLAYER_NUMBER, UPDATE_PLAYER_AVAILABILITY,
  SET_GAME_CONFIGS } from "../actionConstants"

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
  playerAvailability: [true, true],
  gameConfigs: {}
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
        multiSelect: PLAYER_MODE.MULTI_PLAYER,
        playerAvailability: action.payload.availability
      }
    case SELECT_PLAYER_NUMBER:
      console.log("Player number updated in reducer", action.payload.playerNumber)
      return {
        ...state,
        phase: GAME_PHASE.SELECT_GAME_TYPE,
        player: action.payload.playerNumber
      }
    case UPDATE_PLAYER_AVAILABILITY:
      console.log("Player availability updated in reducer", action.payload.playerAvailability)
      return {
        ...state,
        playerAvailability: action.payload.playerAvailability
      }
    case SET_GAME_CONFIGS:
      return {
        ...state,
        configs: action.payload.configs,
        type: action.payload.configs.gameType
      }
    default:
      return state;
  }
};
