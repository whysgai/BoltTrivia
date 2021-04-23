import { useState } from 'react';
import { GAME_TYPE } from "../redux/storeConstants";
// import { selectGameType } from "../client";
//import { gameTypeSelection } from "../redux/actions/gameStateActions";
import { useSelector, useDispatch } from "react-redux";
import WaitingScreen from "./WaitingScreen";
import GameConfigs from "./GameConfigs";
import { selectGameConfig } from "../client";


const GameTypeSelect = () => {
  //const selectedType = useSelector((state) => state.gameStateReducer.type);
  const playerNumber = useSelector((state) => state.gameStateReducer.player);
  const playerAvailability = useSelector(
    (state) => state.gameStateReducer.playerAvailability
  );

  const [selectedType, setType] = useState();
  const [configs, setConfigs] = useState({
    gameType: null,
    timeLimit: null,
    questionCount: 50,
    difficulty: "any",
  });

  const selectTimed = () => {
    console.log("Setting to", GAME_TYPE.TIME_MODE);
    setConfigs({
      ...configs,
      gameType: GAME_TYPE.TIME_MODE,
      timeLimit: 60
    });
  };

  const selectScore = () => {
    console.log("Setting to", GAME_TYPE.SCORE_MODE);
    setConfigs({
      ...configs,
      gameType: GAME_TYPE.SCORE_MODE,
      timeLimit: "none"
    });
  };

  return (
    <>
      {console.log("Mode selected:", configs.gameType)}
      {playerNumber === 0 && !playerAvailability[1] ? (
        <>
          <p>Player 1: select a game mode:</p>
          <button className="btn btn-info" onClick={() => selectTimed()}>Timed</button>
          <button className="btn btn-warning" onClick={() => selectScore()}>Score</button>
          {configs.gameType !== null ? (
            <p>You chose game type {configs.gameType}</p>
          ) : (
            <></>
          )}
          {
            configs.gameType !== null && configs.gameType !== undefined ?
              <GameConfigs configs={configs} setConfigs={setConfigs} selectGameConfig={selectGameConfig}/>
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
