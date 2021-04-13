import { useDispatch } from "react-redux";
import {selectSinglePlayer, connectMultiPlayerMode} from "../redux/actions/gameStateActions"

const MultiSelect = () => {
    const dispatch = useDispatch();

    const selectSinglePlayerClick = () => {
        dispatch(selectSinglePlayer());
    }

    const selectMultiPlayerClick = () => {
        dispatch(connectMultiPlayerMode())
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
