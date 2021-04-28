import { useState } from "react";
import { GAME_TYPE } from "../redux/storeConstants";
import { useSelector } from "react-redux";
import WaitingScreen from "./WaitingScreen";
import GameConfigs from "./GameConfigs";
import { selectGameConfig } from "../client";

const GameTypeSelect = () => {
  const playerNumber = useSelector((state) => state.gameStateReducer.player);
  const playerAvailability = useSelector(
    (state) => state.gameStateReducer.playerAvailability
  );

  const [configs, setConfigs] = useState({
    gameType: null,
    timeLimit: null,
    scoreGoal: 10,
    difficulty: "any",
  });

  const selectTimed = () => {
    console.log("Setting to", GAME_TYPE.TIME_MODE);
    setConfigs({
      ...configs,
      gameType: GAME_TYPE.TIME_MODE,
      timeLimit: 60,
    });
  };

  const selectScore = () => {
    console.log("Setting to", GAME_TYPE.SCORE_MODE);
    setConfigs({
      ...configs,
      gameType: GAME_TYPE.SCORE_MODE,
      timeLimit: "none",
    });
  };

  return (
    <>
      {console.log("Mode selected:", configs.gameType)}
      {playerNumber === 0 && !playerAvailability[1] ? (
        <div className="card card-body config-page">
          <div className="config-copy">
            <h3 className="text-center">Host: Select a game mode</h3>
            <p>
              In timed mode, compete to answer as many questions correctly as you can before time runs out
            </p>
            <p>
              In score mode, answer correctly to reach the goal before your opponent.
            </p>
            <p>
              You get one point for each correct question in both modes.
            </p>
            <h6 className="mb-4">
              If one player runs out of questions, the must wait for the other player
              to finish before viewing the results. If both players run out of questions, the game will end in a draw
            </h6>
          </div>
          <div className="type-buttons">
            <button
              className={`btn ${configs.gameType === GAME_TYPE.TIME_MODE ? "btn-primary" : "btn-outline-primary"} `}
              onClick={() => selectTimed()}
            >
              <h3 className="config-button-text">Timed</h3>
            </button>
            <button 
              className={`btn ${configs.gameType === GAME_TYPE.SCORE_MODE ? "btn-primary" : "btn-outline-primary"} `}
              onClick={() => selectScore()}>
              <h3 className="config-button-text">Score</h3>
            </button>
          </div>
          {configs.gameType !== null ? (
            configs.gameType === GAME_TYPE.TIME_MODE ? (
              <p className="text-center mt-4 text-success">
                Great Choice! TIME is money.
              </p>
            ) : (
              <p className="text-center mt-4 text-success">
                Nice Choice! GOALS Matter.
              </p>
            )
          ) : (
            <></>
          )}
          
          {configs.gameType !== null && configs.gameType !== undefined ? (
            <GameConfigs
              configs={configs}
              setConfigs={setConfigs}
              selectGameConfig={selectGameConfig}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <WaitingScreen />
      )}
    </>
  );
};

export default GameTypeSelect;
