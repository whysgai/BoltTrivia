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
        <>
          <h6 className="my-4">Host: Select a Game Mode:</h6>
          <h6>
            In Timed Mode, you Compete to Answer More Questions in the Same
            Time.
          </h6>
          <h6>
            In Score Mode, the First Person to Reach the Selected Score Goal
            Wins.
          </h6>
          <h6>
            You get One Point per Correct Question Answered in Both Modes.
          </h6>
          <h6 className="mb-4">
            If Both Players Run Out of Questions, you will End Up in a Draw,
            otherwise the First Player to Finish must Wait for the Other Player
            to Complete before Viewing the Results.
          </h6>
          <button
            className="btn btn-primary mx-3"
            onClick={() => selectTimed()}
          >
            Timed
          </button>
          <button className="btn btn-dark" onClick={() => selectScore()}>
            Score
          </button>
          {configs.gameType !== null ? (
            configs.gameType === GAME_TYPE.TIME_MODE ? (
              <p className="text-center mt-4 text-success">
                Great Choice! TIME is Money.
              </p>
            ) : (
              <p className="text-center mt-4 text-success">
                Nice Choice! GOALS MATTER.
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
        </>
      ) : (
        <WaitingScreen />
      )}
    </>
  );
};

export default GameTypeSelect;
