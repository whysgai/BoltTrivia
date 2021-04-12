import "../styles/App.css";
import { selectMultiplayerMode } from "../client";

function App() {
  return (
    <div className="App">
      <button onClick={selectMultiplayerMode}>test</button>
    </div>
  );
}

export default App;
