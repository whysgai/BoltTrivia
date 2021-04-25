import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  START_MP_QUIZ,
  END_MP_QUIZ,
  UPDATE_SCOREBOARDS,
  UPDATE_MP_TIME,
  RESTART_SELECTIONS,
  UPDATE_MP_SCORES,
  SET_FINAL_RESULTS,
} from "../actionConstants";

const INITIAL_STATE = {
  questions: [],
  count: 0,
  playerAnswers: [[], []], //an array of both P1 and P2's booleans for the questions
  answerStrings: [], //actual answer provided, NOT True or False
  quizInProgress: false,
  time: 0,
  scores: [0, 0],
  winner: null, // winner can be P1, P2 or Draw
  finalTimes: [0, 0],
};

export const MPQuestionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESTART_SELECTIONS:
      return {
        ...INITIAL_STATE,
      };
    case SET_MP_QUESTIONS:
      console.log("New questions", action.payload.questions);
      return {
        ...state,
        questions: action.payload.questions,
      };
    case UPDATE_MP_TIME:
      return {
        ...state,
        time: state.time + 1,
      };
    case UPDATE_MP_SCORES:
      return {
        ...state,
        scores: action.payload.scores,
      };
    case ADD_MP_ANSWER:
      state.answerStrings.push(action.payload.answer);
      let newCount = state.count + 1;
      return {
        ...state,
        answerStrings: state.answerStrings,
        count: newCount,
      };
    case UPDATE_SCOREBOARDS:
      return {
        ...state,
        playerAnswers: action.payload.playerAnswers,
      };
    case SET_FINAL_RESULTS:
      return {
        ...state,
        playerAnswers: action.payload.finalResults.playerAnswers,
        finalTimes: action.payload.finalResults.finalTimes,
        scores: action.payload.finalResults.playerScores,
        winner: action.payload.finalResults.winner,
        // quizInProgress: false,
      };
    default:
      return state;
  }
};
