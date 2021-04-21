import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { startMPTimer, stopMPTimer } from "../redux/actions/MPQuestionActions";

const MPTimer = () => {
  const timeLimit = useSelector(
    (state) => state.gameStateReducer.configs.timeLimit
  );
  const time = useSelector((state) => state.MPQuestionReducer.time);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(timeLimit);
    dispatch(startMPTimer());
  }, []);

  return (
    <>
      {time >= timeLimit && dispatch(stopMPTimer())}
      <p>{time}</p>
    </>
  );
};

export default MPTimer;
