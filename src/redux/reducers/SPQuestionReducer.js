import {} from "../storeConstants";
import {
  SET_SP_TRIVIA_QUESTIONS,
  ADD_SP_ANSWER,
  SET_SP_BEGIN_QUIZ,
  UNSET_SP_BEGIN_QUIZ,
} from "../actionConstants";

const INITIAL_STATE = {
  questions: [],
  count: 10,
  answeredCount: 0,
  answers: [],
  beginQuiz: false,
};

export const SPQuestionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SP_TRIVIA_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        count: action.payload.questions.length,
      };
    case ADD_SP_ANSWER:
      const newAnsweredCount = state.answeredCount + 1;
      const newAnswers = state.answers.concat([action.payload.answer]);
      return {
        ...state,
        answeredCount: newAnsweredCount,
        answers: newAnswers,
      };
    case SET_SP_BEGIN_QUIZ:
      return {
        ...state,
        beginQuiz: true,
      };
    case UNSET_SP_BEGIN_QUIZ:
      return {
        ...state,
        beginQuiz: false,
        answeredCount: 0,
        answers: [],
        questions: [],
      };
    default:
      return state;
  }
};
