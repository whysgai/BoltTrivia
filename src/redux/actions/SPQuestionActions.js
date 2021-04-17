import { SET_SP_TRIVIA_QUESTIONS, ADD_SP_ANSWER } from "../actionConstants"
import {  } from "react-redux";

export const setSPQuestions = (data) => ({
    type: SET_SP_TRIVIA_QUESTIONS,
    payload: {
        questions: data
    }
});

export const addAnswer = (answer) => ({
    type: ADD_SP_ANSWER,
    payload: {
        answer: answer
    }
});