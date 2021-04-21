import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { startMPTimer, stopMPTimer } from "../redux/actions/MPQuestionActions";
import { GAME_TYPE } from "../redux/storeConstants";

const MPTimer = () => {
  const gameType = useSelector(
    (state) => state.gameStateReducer.type
  );
  const timeLimit = useSelector(
    (state) => state.gameStateReducer.configs.timeLimit
  );
  const time = useSelector((state) => state.MPQuestionReducer.time);
  const dispatch = useDispatch();
  if (timeLimit !== "none" && time >= timeLimit) {
    dispatch(stopMPTimer());
  } // add score completed condition to else if
  else if (timeLimit === "none") {
    console.log("stopping");
    dispatch(stopMPTimer());
  }

  useEffect(() => {
    console.log(timeLimit);
    dispatch(startMPTimer());
  }, []);

  return (
    <>
      {
        gameType === GAME_TYPE.TIME_MODE ?
          <p>{timeLimit - time}</p>
          :
          <p>{time}</p>
      }
    </>
  );
};

export default MPTimer;
