import "../styles/App.css";
import {GAME_PHASE} from "../redux/storeConstants"
import { useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";

function App() {
  const gameState = useSelector(state => state.gameStateReducer)

  return (
    <div className="App">
      <h2>Bolt Trivia!</h2>
      {
        gameState.phase === GAME_PHASE.SELECT_MULTI &&
        <MultiSelect/>
      }
    </div>
  );
}

export default App;
