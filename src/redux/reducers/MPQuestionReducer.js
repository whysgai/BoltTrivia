import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  START_MP_QUIZ,
  END_MP_QUIZ,
} from "../actionConstants";

const INITIAL_STATE = {
  questions: [],
  answers: [],
  quizInProgress: false,
};

export const MPQuestionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MP_QUESTIONS:
      console.log("New questions", action.payload.questions);
      return {
        ...state,
        questions: action.payload.questions,
      };
    default:
      return state;
  }
};
