import { SET_SP_TRIVIA_QUESTIONS } from "../actionConstants"
import {  } from "react-redux";

export const setSPQuestions = (data) => ({
    type: SET_SP_TRIVIA_QUESTIONS,
    payload: {
        questions: data
    }
});