import "../styles/App.css";
import {GAME_PHASE, PLAYER_MODE} from "../redux/storeConstants"
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";
import ChoosePlayer from "../components/ChoosePlayer";

function App() {
  const gameState = useSelector(state => state.gameStateReducer)

  return (
    <div className="App">
      <h2>Bolt Trivia!</h2>
      {
        gameState.phase === GAME_PHASE.SELECT_MULTI &&
        <MultiSelect/>
      }
      {
        gameState.multiSelect === PLAYER_MODE.SINGLE_PLAYER &&
        <>
          <p>You have chosen Single Player mode.</p>
        </>
      }
      {
        gameState.phase === GAME_PHASE.SELECT_PLAYER &&
        <>
          <p>You have chosen Multi Player mode.</p>
          <ChoosePlayer/>
        </>
      }
    </div>
  );
}

export default App;
