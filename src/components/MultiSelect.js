import { selectMultiplayerMode } from "../client";
import { useDispatch } from "react-redux";
import {selectSinglePlayer, selectMultiPlayer} from "../redux/gameStateActions"

const MultiSelect = () => {
    const dispatch = useDispatch();

    const selectSinglePlayerClick = () => {
        dispatch(selectSinglePlayer());
    }

    const selectMultiPlayerClick = () => {
        dispatch(selectMultiPlayer());
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
