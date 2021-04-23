import "../styles/App.css";
import { GAME_PHASE, PLAYER_MODE } from "../redux/storeConstants";
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";
import ChoosePlayer from "../components/ChoosePlayer";
import GameTypeSelect from "../components/GameTypeSelect";
import SinglePlayer from "../components/SinglePlayer";
import { updatePlayerScore, finishMPGame } from "../client.js";
import NavbarComponent from "../components/Navbar";
import MPTimer from "../components/MPTimer";
import Onboarding from "../components/Onboarding";

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
                <p>MP loading the game {console.log("Loading game")}</p>
              ) : gameState.phase === GAME_PHASE.PLAY_GAME ? (
                <>
                  <p>MP running the game</p>
                  <MPTimer />
                  <button onClick={() => updatePlayerScore(0, 10)}>
                    Update Player 1 Score by 10
                  </button>
                  <button onClick={() => finishMPGame()}>Game Over</button>
                </>
              ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
                <p>MP view the scores</p>
              ) : (
                <p>MP Error catching</p>
              )
            ) : (
              //Single player
              //gameState.phase === GAME_PHASE.SET_CONFIGS ? (
              <SinglePlayer />
            )
            // ) : gameState.phase === GAME_PHASE.PLAY_GAME ? (
            //   <p>SP running the game</p>
            // ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
            //   <p>SP view the scores</p>
            // ) : (
            //   <p>SP Error catching</p>
            // )
          }
        </>
      )}
    </div>
  );
}

export default App;
