import { useState } from 'react';
import { GAME_TYPE } from "../redux/storeConstants";
// import { selectGameType } from "../client";
//import { gameTypeSelection } from "../redux/actions/gameStateActions";
import { useSelector, useDispatch } from "react-redux";
import WaitingScreen from "./WaitingScreen";
import GameConfigs from "./GameConfigs";
import ScoreConfigs from "./ScoreConfigs";


const GameTypeSelect = () => {
  //const selectedType = useSelector((state) => state.gameStateReducer.type);
  const playerNumber = useSelector((state) => state.gameStateReducer.player);
  const playerAvailability = useSelector(
    (state) => state.gameStateReducer.playerAvailability
  );

  const [selectedType, setType] = useState();

  const dispatch = useDispatch();

  const selectTimed = () => {
    console.log("Setting to", GAME_TYPE.TIME_MODE);
    // selectGameType(GAME_TYPE.TIME_MODE);
    //dispatch(gameTypeSelection(GAME_TYPE.TIME_MODE));
    setType(GAME_TYPE.TIME_MODE);
  };

  const selectScore = () => {
    console.log("Setting to", GAME_TYPE.SCORE_MODE);
    //selectGameType(GAME_TYPE.SCORE_MODE);
    //dispatch(gameTypeSelection(GAME_TYPE.SCORE_MODE));
    setType(GAME_TYPE.SCORE_MODE);
  };

  return (
    <>
      {playerNumber === 0 && !playerAvailability[1] ? (
        <>
          <p>Player 1: select a game mode:</p>
          <button className="btn btn-info" onClick={() => selectTimed()}>Timed</button>
          <button className="btn btn-warning" onClick={() => selectScore()}>Score</button>
          {selectedType !== null ? (
            <p>You chose game type {selectedType}</p>
          ) : (
            <></>
          )}
          {
            selectedType !== null && selectedType !== undefined ?
              <gameConfigs selectedType={selectedType}/>
              :
              <></>
          }
        </>
      ) : (
        <WaitingScreen />
      )}
    </>
  );
};

export default GameTypeSelect;
