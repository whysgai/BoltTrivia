import { PLAYER_MODE, GAME_TYPE, GAME_PHASE } from "../storeConstants";
import {
  SELECT_SINGLE_PLAYER_TYPE,
  SELECT_MULTI_PLAYER_TYPE,
  SELECT_PLAYER_NUMBER,
  UPDATE_PLAYER_AVAILABILITY,
  SET_GAME_CONFIGS,
  RESTART_SELECTIONS,
  OPEN_ONBOARDING,
  CLOSE_ONBOARDING,
} from "../actionConstants";
import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  START_MP_QUIZ,
  END_MP_QUIZ,
} from "../actionConstants";

const INITIAL_STATE = {
  player: null,
  type: null,
  phase: GAME_PHASE.SELECT_MULTI,
  multiSelect: null,
  playerAvailability: [true, true],
  configs: {
    timeLimit: "none",
    questionCount: 50,
    difficulty: "any",
  },
  restart: false,
  onboarding: false,
};

export const gameStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESTART_SELECTIONS:
      return {
        player: null,
        type: null,
        phase: GAME_PHASE.SELECT_MULTI,
        multiSelect: null,
        playerAvailability: [true, true],
        configs: {
          timeLimit: "none",
          questionCount: 50,
          difficulty: "any",
        },
        restart: action.payload.restart,
      };
    case SELECT_SINGLE_PLAYER_TYPE:
      return {
        ...state,
        restart: false,
        phase: GAME_PHASE.SELECT_GAME_TYPE,
        multiSelect: PLAYER_MODE.SINGLE_PLAYER,
      };
    case SELECT_MULTI_PLAYER_TYPE:
      return {
        ...state,
        restart: false,
        phase: GAME_PHASE.SELECT_PLAYER,
        multiSelect: PLAYER_MODE.MULTI_PLAYER,
        playerAvailability: action.payload.availability,
      };
    case SELECT_PLAYER_NUMBER:
      console.log(
        "Player number updated in reducer",
        action.payload.playerNumber
      );
      return {
        ...state,
        phase: GAME_PHASE.SELECT_GAME_TYPE,
        player: action.payload.playerNumber,
      };
    case UPDATE_PLAYER_AVAILABILITY:
      console.log(
        "Player availability updated in reducer",
        action.payload.playerAvailability
      );
      return {
        ...state,
        playerAvailability: action.payload.playerAvailability,
      };
    case SET_GAME_CONFIGS:
      return {
        ...state,
        phase: GAME_PHASE.LOADING_GAME,
        configs: action.payload.configs,
        type: action.payload.configs.gameType,
      };
    case SET_MP_QUESTIONS:
      return {
        ...state,
        phase: GAME_PHASE.PLAY_GAME,
      };
    case OPEN_ONBOARDING:
      return {
        ...state,
        onboarding: true,
      };
    case CLOSE_ONBOARDING:
      return {
        ...state,
        onboarding: false,
      };
    default:
      return state;
  }
};
