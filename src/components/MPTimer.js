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
    console.log("Timed and timelimt is exceeded - stopping timer")
    dispatch(stopMPTimer());
  } // add score completed condition to else if
  else if (timeLimit === "none" && time >= 5) {
    console.log("Score - stopping after 5");
    dispatch(stopMPTimer());
  }

  useEffect(() => {
    console.log("Starting time is ", time);
    console.log("sSetting time limit", timeLimit);
    dispatch(startMPTimer());
  }, []);

  return (
    <>
      {
        gameType === GAME_TYPE.TIME_MODE ?
          <span>{timeLimit - time}</span>
          :
          <span>{time}</span>
      }
    </>
  );
};

export default MPTimer;
