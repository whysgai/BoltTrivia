import "../styles/App.css";
import { GAME_PHASE, PLAYER_MODE, GAME_TYPE } from "../redux/storeConstants";
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";
import ChoosePlayer from "../components/ChoosePlayer";
import GameTypeSelect from "../components/GameTypeSelect";
import SinglePlayer from "../components/SinglePlayer";
import NavbarComponent from "../components/Navbar";
import Onboarding from "../components/Onboarding";
import MPScoreboardTimed from "../components/MPScoreboardTimed";
import MPScoreboardScored from "../components/MPScoreboardScored";
import MPQuiz from "../components/MPQuiz";
import MPResults from "../components/MPResults";
import WaitingScreen from "../components/WaitingScreen";

function App() {
  const gameState = useSelector((state) => state.gameStateReducer);

  return (
    <div className="App">
      {console.log("game phase", gameState.phase)}
      {gameState.onboarding ? (
        <Onboarding />
      ) : (
        <>
          <NavbarComponent />
          <div className="container">
            {gameState.restart && (
              <div className="alert alert-danger">
                You or your opponent has quit, please choose Single Player or
                Multi Player to play again.
              </div>
            )}
            {gameState.phase === GAME_PHASE.SELECT_MULTI ? (
              <MultiSelect />
            ) : gameState.multiSelect === PLAYER_MODE.MULTI_PLAYER ? (
              // Multiplayer
              gameState.phase === GAME_PHASE.SELECT_PLAYER ? (
                <ChoosePlayer />
              ) : gameState.phase === GAME_PHASE.SELECT_GAME_TYPE ? (
                <GameTypeSelect />
              ) : gameState.phase === GAME_PHASE.LOADING_GAME ? (
                <WaitingScreen />
              ) : gameState.phase === GAME_PHASE.PLAY_GAME ? (
                <>
                  <div className="quiz-container">
                    <MPQuiz />
                    {gameState.type === GAME_TYPE.TIME_MODE ? (
                      <MPScoreboardTimed />
                    ) : gameState.type === GAME_TYPE.SCORE_MODE ? (
                      <MPScoreboardScored />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : gameState.phase === GAME_PHASE.AWAITING_RESULTS ? (
                <WaitingScreen />
              ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
                <MPResults />
              ) : (
                gameState.phase === GAME_PHASE.ERROR_OCCURRED && (
                  <p>
                    An error occurred connecting to the server. Please select
                    the Home button and try again.
                  </p>
                )
              )
            ) : gameState.phase === GAME_PHASE.ERROR_OCCURRED ? (
              <p>
                An error occurred connecting to the server. Please select the
                Home button and try again.
              </p>
            ) : (
              <SinglePlayer />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
