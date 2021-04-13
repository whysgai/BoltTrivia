import { useDispatch } from "react-redux";
import { selectMultiplayerMode } from "../client";
import {connectSinglePlayerMode, connectMultiPlayerMode} from "../redux/actions/gameStateActions"

const MultiSelect = () => {
    const dispatch = useDispatch();

    const selectSinglePlayerClick = () => {
        dispatch(connectSinglePlayerMode());
    }

    const selectMultiPlayerClick = () => {
        selectMultiplayerMode();
    }

  return (
    <>
      <p>Choose single player or multiplayer.</p>
      <button className='btn-sm btn-primary' onClick={() => selectMultiPlayerClick()}>Multiplayer</button>
      <button className='btn-sm btn-primary' onClick={() => selectSinglePlayerClick()}>Single Player</button>
    </>
  );
};

export default MultiSelect;
