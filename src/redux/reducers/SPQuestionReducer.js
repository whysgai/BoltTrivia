import {  } from "../storeConstants";
import { SET_SP_TRIVIA_QUESTIONS } from "../actionConstants"

const INITIAL_STATE = {
  questions: [],
};

export const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SP_TRIVIA_QUESTIONS:
      console.log('questions: ', action.payload.questions)
      return {
        questions: action.payload.questions
      }
    default:
      return state;
  }
};
