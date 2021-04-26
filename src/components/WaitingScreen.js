import { GAME_PHASE } from "../redux/storeConstants";
import { useSelector } from "react-redux";

const WaitingScreen = () => {
  const gamePhase = useSelector((state) => state.gameStateReducer.phase);
  const playerNumber = useSelector((state) => state.gameStateReducer.player);

  return (
    <>
      {gamePhase === GAME_PHASE.SELECT_GAME_TYPE && playerNumber === 1 ? 
        <p>Waiting for Player 1 to select game mode</p>
        : 
        gamePhase === GAME_PHASE.SELECT_GAME_TYPE && playerNumber === 0 ? 
          <p>Waiting for Player 2 to Join</p>
          : 
          gamePhase === GAME_PHASE.LOADING_GAME ? 
            <p>MP loading the game</p>
            :
            gameState.phase === GAME_PHASE.AWAITING_RESULTS ?
              <p>End condition reached, waiting on server</p>
              // Ran out of questions
              // Ran out of time
              // Reached goal
              // Other player reached goal
              :
              <></>
      }
    </>
  );
};

export default WaitingScreen;
