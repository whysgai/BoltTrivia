import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardTimed = () => {
    const player = useSelector(state => state.gameStateReducer.player);
    const scores = useSelector(state => state.MPQuestionReducer.scores)
    //dummy score history
    const wins = [true, false, true, true, false, true];

    return (
        <div>
            <p>Scoreboard (timed)</p>
            <p>Timer Component</p>
            <MPTimer />
            <p>{player === 0 ? "P1" : "P2"}'s score: {scores[player]}</p>
            <div>
                {
                    wins.map((question, index) => 
                        <div>Question {index}: {question ? "Correct" : "Wrong"}</div>
                    )
                }
            </div>
            <p>{player === 0 ? "P2" : "P1"}'s score: {scores[player === 0 ? 1 : 0]}</p>
        </div>
    );
};

export default MPScoreboardTimed;