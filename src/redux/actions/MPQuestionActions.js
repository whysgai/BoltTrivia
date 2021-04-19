import { SET_MP_QUESTIONS, ADD_MP_ANSWER, START_MP_QUIZ, END_MP_QUIZ } from "../actionConstants";

export const setMPQuestions = (questions) => ({
    type: SET_MP_QUESTIONS,
    payload: {
        questions
    }
});