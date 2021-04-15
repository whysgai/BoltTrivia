import { GAME_TYPE } from "../redux/storeConstants";
import { selectGameType } from "../client";
import { useSelector } from "react-redux";
import WaitingScreen from "./WaitingScreen";

const GameTypeSelect = () => {
  const selectedType = useSelector((state) => state.gameStateReducer.type);
  const playerNumber = useSelector((state) => state.gameStateReducer.player);

  const selectTimed = () => {
    selectGameType(GAME_TYPE.TIME_MODE);
  };

  const selectScore = () => {
    selectGameType(GAME_TYPE.SCORE_MODE);
  };

  return (
    <>
      {playerNumber === 0 ? (
        <>
          <p>Player 1: select a game mode:</p>
          <button className="btn btn-info" onClick={() => selectTimed()}>
            Timed
          </button>
          <button className="btn btn-warning" onClick={() => selectScore()}>
            Score
          </button>
          {selectedType !== null ? (
            <p>You chose game type {selectedType}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <WaitingScreen />
      )}
    </>
  );
};

export default GameTypeSelect;
