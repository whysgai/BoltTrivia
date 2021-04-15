import "../styles/App.css";
import { GAME_PHASE, PLAYER_MODE } from "../redux/storeConstants";
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";
import ChoosePlayer from "../components/ChoosePlayer";
import GameTypeSelect from "../components/GameTypeSelect";

function App() {
  const gameState = useSelector((state) => state.gameStateReducer);

  return (
    <div className="App">
      <h2>Bolt Trivia!</h2>
      {gameState.phase === GAME_PHASE.SELECT_MULTI ? (
        <MultiSelect />
      ) : gameState.multiSelect === PLAYER_MODE.MULTI_PLAYER ? (
        // Multiplayer
        gameState.phase === GAME_PHASE.SELECT_PLAYER ? (
          <ChoosePlayer />
        ) : gameState.phase === GAME_PHASE.SELECT_GAME_TYPE ? (
          <GameTypeSelect />
        ) : gameState.phase === GAME_PHASE.SET_CONFIGS ? (
          <p>MP set configs</p>
        ) : gameState.phase === GAME_PHASE.PLAY_GAME ? (
          <p>MP running the game</p>
        ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
          <p>MP view the scores</p>
        ) : (
          <p>MP Error catching</p>
        )
      ) : //Single player
      gameState.phase === GAME_PHASE.SET_CONFIGS ? (
        <p>SP set configs</p>
      ) : gameState.phase === GAME_PHASE.PLAY_GAME ? (
        <p>SP running the game</p>
      ) : gameState.phase === GAME_PHASE.VIEW_SCORES ? (
        <p>SP view the scores</p>
      ) : (
        <p>SP Error catching</p>
      )}
    </div>
  );
}

export default App;
