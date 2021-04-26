import { GAME_PHASE, END_CONDITION } from "../redux/storeConstants";
import { useSelector } from "react-redux";

const WaitingScreen = () => {
  const gamePhase = useSelector((state) => state.gameStateReducer.phase);
  const playerNumber = useSelector((state) => state.gameStateReducer.player);
  const endCondition = useSelector((state) => state.gameStateReducer.endCondition);

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
            gamePhase === GAME_PHASE.AWAITING_RESULTS && endCondition === END_CONDITION.OUT_OF_QUESTIONS ?
              <p>No more questions: waiting for other player to finish</p>
              :
              gamePhase === GAME_PHASE.AWAITING_RESULTS && endCondition === END_CONDITION.OUT_OF_TIME ?
                <p>Out of time: processing results</p>
                :
                gamePhase === GAME_PHASE.AWAITING_RESULTS && endCondition === END_CONDITION.SCORE_REACHED ?
                  <p>Goal reached: processing results</p>
                  :
                  gamePhase === GAME_PHASE.AWAITING_RESULTS && endCondition === END_CONDITION.OTHER_SCORE_REACHED ?
                  <p>Other player has reached goal: processing results</p>
                  :
                  <></>
      }
    </>
  );
};

export default WaitingScreen;
