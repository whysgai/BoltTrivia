
import { GAME_TYPE } from "../redux/storeConstants";
import { selectGameType } from "../client";
import { useSelector } from "react-redux";

const GameTypeSelect = () => {
    const selectedType = useSelector(state => state.gameStateReducer.type);

    const selectTimed = () => {
        selectGameType(GAME_TYPE.TIME_MODE);
    };

    const selectScore = () => {
        selectGameType(GAME_TYPE.SCORE_MODE);
    };

    return (
        <>
            <p>Player 1: select a game mode:</p>
            <button className="btn btn-info" onClick={() => selectTimed()}>Timed</button>
            <button className="btn btn-warning" onClick={() => selectScore()}>Score</button>
            {
                selectedType !== null ?
                    <p>You chose game type {selectedType}</p>
                    :
                    <></>
            }
        </>
    );
};

export default GameTypeSelect;