import {
  SET_MP_QUESTIONS,
  ADD_MP_ANSWER,
  UPDATE_SCOREBOARDS,
  UPDATE_MP_TIME,
  UPDATE_MP_SCORES,
  SET_FINAL_RESULTS,
  AWAIT_FINAL_RESULTS,
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

export const updateMPScores = (scores) => ({
  type: UPDATE_MP_SCORES,
  payload: {
    scores,
  },
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
  console.log("stop timer");
  return (dispatch) => {
    clearInterval(timer);
  };
};

export const setMPPlayerAnswers = (playerAnswers) => ({
  type: UPDATE_SCOREBOARDS,
  payload: {
    playerAnswers: playerAnswers,
  },
});

export const addMPAnswer = (answer) => ({
  type: ADD_MP_ANSWER,
  payload: {
    answer: answer,
  },
});

export const awaitFinalResults = (condition) => ({
  type: AWAIT_FINAL_RESULTS,
  payload: {
    condition
  }
});

export const setFinalResults = (finalResults) => ({
  type: SET_FINAL_RESULTS,
  payload: {
    finalResults,
  },
});