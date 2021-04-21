import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  START_MP_QUIZ,
  END_MP_QUIZ,
  UPDATE_MP_TIME,
} from "../actionConstants";

export const setMPQuestions = (questions) => ({
  type: SET_MP_QUESTIONS,
  payload: {
    questions,
  },
});

export const updateMPTime = () => ({
  type: UPDATE_MP_TIME,
});

let timer = null;
export const startMPTimer = () => {
  return (dispatch) => {
    timer = setInterval(() => {
      dispatch(updateMPTime());
    }, 1000);
  };
};

export const stopMPTimer = () => {
  console.log("stop timer")
  return (dispatch) => {
    clearInterval(timer);
  };
};
