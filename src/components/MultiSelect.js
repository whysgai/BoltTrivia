import { useDispatch } from "react-redux";
import { selectMultiplayerMode } from "../client";
import {
  connectSinglePlayerMode
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
    <div className="card card-body config-page">
      <div className="logo-holder">
        <img src="trivia_animation.gif" className="logo" />
      </div>
      <div className="config-copy">
        <h6 className="mt-4 text-center mb-2">
          Select whether you Want to play in single player or multiplayer mode.
        </h6>
        <h6 className="text-center mb-4">
          Or, view the tutorial from the menu to learn more.
        </h6>
      </div>
      <div className="config-buttons">
        <button
          className="btn btn-primary"
          onClick={() => selectMultiPlayerClick()}
        >
          <h6 className="config-button-text">Multiplayer</h6>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => selectSinglePlayerClick()}
        >
          <h6 className="config-button-text">Single Player</h6>
        </button>
      </div>      
    </div>
  );
};

export default MultiSelect;
