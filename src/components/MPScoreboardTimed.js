import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardTimed = () => {
    const player = useSelector(state => state.gameStateReducer.player);
    //dummy score history
    const wins = [true, false, true, true, false, true];

    return (
        <div>
            <p>Scoreboard (timed)</p>
            <p>Timer Component</p>
            <MPTimer />
            <p>List of {player === 0 ? "P1" : "P2"}'s questions</p>
            <div>
                {
                    wins.map((question, index) => 
                        <div>Question {index}: {question ? "Correct" : "Wrong"}</div>
                    )
                }
            </div>
            <p>{player === 0 ? "P2" : "P1"}'s ratio</p>
        </div>
    );
};

export default MPScoreboardTimed;