import {  } from "../storeConstants";
import { SET_SP_TRIVIA_QUESTIONS, ADD_SP_ANSWER } from "../actionConstants"

const INITIAL_STATE = {
  questions: [],
  count: 10,
  answeredCount: 0,
  answers: [],
};

export const SPQuestionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SP_TRIVIA_QUESTIONS:
      return { ...state,
        questions: action.payload.questions,
        count: action.payload.questions.length,
      }
    case ADD_SP_ANSWER:
      const newAnsweredCount = state.answeredCount + 1;
      const newAnswers = state.answers.concat([action.payload.answer])
      return {
        ...state,
        answeredCount: newAnsweredCount,
        answers: newAnswers
      }
    default:
      return state;
  }
};
