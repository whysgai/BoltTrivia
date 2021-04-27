import { useDispatch } from "react-redux";
import { selectMultiplayerMode } from "../client";
import {
  connectSinglePlayerMode,
  connectMultiPlayerMode,
} from "../redux/actions/gameStateActions";

const MultiSelect = () => {
  const dispatch = useDispatch();

  const selectSinglePlayerClick = () => {
    dispatch(connectSinglePlayerMode());
  };

  const selectMultiPlayerClick = () => {
    selectMultiplayerMode();
  };

  return (
    <>
      <h6 className="mt-4 text-center mb-4">
        Select Whether You Want to Play in Single Player or Multiplayer Mode.
        View the Tutorial from the Menu to Learn More.
      </h6>
      <button
        className="btn-sm btn-primary mx-3"
        onClick={() => selectMultiPlayerClick()}
      >
        Multiplayer
      </button>
      <button
        className="btn-sm btn-primary"
        onClick={() => selectSinglePlayerClick()}
      >
        Single Player
      </button>
    </>
  );
};

export default MultiSelect;
