import { PLAYER_MODE, GAME_PHASE } from "../storeConstants";
import {
  SELECT_SINGLE_PLAYER_TYPE,
  SELECT_MULTI_PLAYER_TYPE,
  SELECT_PLAYER_NUMBER,
  UPDATE_PLAYER_AVAILABILITY,
  SET_GAME_CONFIGS,
  RESTART_SELECTIONS,
  OPEN_ONBOARDING,
  CLOSE_ONBOARDING,
  SET_FINAL_RESULTS,
  AWAIT_FINAL_RESULTS,
  ERROR_OCCURRED
} from "../actionConstants";
import {
  SET_MP_QUESTIONS,
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
    scoreGoal: 10,
    difficulty: "any",
  },
  endCondition: null,
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
          scoreGoal: 10,
          difficulty: "any",
        },
        endCondition: null,
        restart: action.payload.restart,
        onboarding: false,
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
    case AWAIT_FINAL_RESULTS:
      return {
        ...state,
        phase: GAME_PHASE.AWAITING_RESULTS,
        endCondition: action.payload.condition
      };
    case SET_FINAL_RESULTS:
      return {
        ...state,
        phase: GAME_PHASE.VIEW_SCORES,
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
    case END_MP_QUIZ:
      return {
        ...state,
        phase: GAME_PHASE.VIEW_SCORES,
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        phase: GAME_PHASE.ERROR_OCCURRED
      }
    default:
      return state;
  }
};
