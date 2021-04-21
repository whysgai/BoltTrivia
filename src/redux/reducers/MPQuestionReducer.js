import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  START_MP_QUIZ,
  END_MP_QUIZ,
  UPDATE_MP_TIME,
  RESTART_SELECTIONS,
} from "../actionConstants";

const INITIAL_STATE = {
  questions: [],
  answersBool: [],
  answerStrings: [],
  quizInProgress: false,
  time: 0,
};

export const MPQuestionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case RESTART_SELECTIONS:
      return {
        time: 0,
      };
    default:
      return state;
  }
};
