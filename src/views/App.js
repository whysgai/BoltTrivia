import "../styles/App.css";
import { GAME_PHASE, PLAYER_MODE, GAME_TYPE } from "../redux/storeConstants";
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";
import ChoosePlayer from "../components/ChoosePlayer";
import GameTypeSelect from "../components/GameTypeSelect";
import SinglePlayer from "../components/SinglePlayer";
import { updatePlayerScore, finishMPGame } from "../client.js";
import NavbarComponent from "../components/Navbar";
import MPTimer from "../components/MPTimer";
import Onboarding from "../components/Onboarding";
import MPScoreboardTimed from "../components/MPScoreboardTimed";
import MPScoreboardScored from "../components/MPScoreboardScored";
import MPQuiz from "../components/MPQuiz"
import MPResults from "../components/MPResults";
import WaitingScreen from "../components/WaitingScreen";

function App() {
  const gameState = useSelector((state) => state.gameStateReducer);
  const spState = useSelector((state) => state.SPQuestionReducer);
  const mpState = useSelector((state) => state.MPQuestionReducer);

  return (
    <div className="App">
      {console.log("game phase", gameState.phase)}
      {gameState.onboarding ? (
        <Onboarding />
      ) : (
        <>
          <NavbarComponent />
          <h2 className="mt-3">Bolt Trivia!</h2>
          {gameState.restart && (
            <div className="alert alert-danger">
              You or your opponent has quit, please choose Single Player or
              Multi Player to play again.
            </div>
          )}
          {
            gameState.phase === GAME_PHASE.SELECT_MULTI ? (
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
                  <div>
                    <p>MP running the game</p>
                    <MPQuiz />
                    {/* <MPTimer /> */}
                    <button onClick={() => updatePlayerScore(0, 10)}>
                      Update Player 1 Score by 10
                    </button>
                    <button onClick={() => finishMPGame()}>Game Over</button>
                  </div>
                  {gameState.type === GAME_TYPE.TIME_MODE ? (
                    <MPScoreboardTimed />
                  ) : gameState.type === GAME_TYPE.SCORE_MODE ? (
                    <MPScoreboardScored />
                  ) : (
                    <></>
                  )}
                </>
              ) : gameState.phase === GAME_PHASE.AWAITING_RESULTS ? (
                < WaitingScreen/>  
              ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
                <MPResults/>
              ) : gameState.phase === GAME_PHASE.ERROR_OCCURRED && (
                <p>An error occurred connecting to the server. Please select the Home button and try again.</p>
              )
            ) : (
              <SinglePlayer />
            )
          }
        </>
      )}
    </div>
  );
}

export default App;
