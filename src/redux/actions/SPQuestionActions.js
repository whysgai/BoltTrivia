import {
  SET_SP_TRIVIA_QUESTIONS,
  ADD_SP_ANSWER,
  SET_SP_BEGIN_QUIZ,
  UNSET_SP_BEGIN_QUIZ,
} from "../actionConstants";
import {} from "react-redux";

export const setSPQuestions = (data) => ({
  type: SET_SP_TRIVIA_QUESTIONS,
  payload: {
    questions: data,
  },
});

export const addAnswer = (answer) => ({
  type: ADD_SP_ANSWER,
  payload: {
    answer: answer,
  },
});

export const setSPBeginQuiz = () => ({
  type: SET_SP_BEGIN_QUIZ,
});

export const unsetSPBeginQuiz = () => ({
  type: UNSET_SP_BEGIN_QUIZ,
});
