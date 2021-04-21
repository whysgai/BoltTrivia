import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { startMPTimer, stopMPTimer } from "../redux/actions/MPQuestionActions";

const MPTimer = () => {
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
      <p>{time}</p>
    </>
  );
};

export default MPTimer;
