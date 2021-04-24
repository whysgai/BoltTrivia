
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayerMulti } from "../client";
import {viewResults} from "../redux/actions/gameStateActions"


const ChoosePlayer = () => {
  const playerAvailability = useSelector(state => state.gameStateReducer.playerAvailability);
  const dispatch = useDispatch();

  const selectP1 = () => {
    selectPlayerMulti(0);
  };

  const selectP2 = () => {
    selectPlayerMulti(1);
  };

  useEffect(() => {
    console.log("Player availability updated in chose player component")
  }, [playerAvailability]);

  const results = () => {
    dispatch(viewResults())
  }

  return (
    <>
      <p>Choose Player 1 or Player 2.</p>
      <button className='btn-sm btn-secondary' onClick={() => selectP1()} disabled={!playerAvailability[0]}>Player 1</button>
      <button className='btn-sm btn-secondary' onClick={() => selectP2()} disabled={!playerAvailability[1]}>Player 2</button>
      <button onClick={() => results()}>Test View Results</button>
    </>
  );
};

export default ChoosePlayer;