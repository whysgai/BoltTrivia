import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardScored = () => {
    const player = useSelector(state => state.gameStateReducer.player);
    const scores = useSelector(state => state.MPQuestionReducer.scores);
    const goal = useSelector(state => state.gameStateReducer.configs.questionCount);
    //dummy score history
    const wins = [true, false, true, true, false, true];

    return (
        <div>
            <p>Scoreboard (timed)</p>
                     
            <p>{player === 0 ? "P1" : "P2"}'s score: {scores[player]}</p>
            <p>{player === 0 ? "P2" : "P1"}'s score: {scores[player === 0 ? 1 : 0]}</p>
            <p>Out of&nbsp;{goal} </p>
            <div>
                {
                    wins.map((question, index) => 
                        <div>Question {index}: {question ? "Correct" : "Wrong"}</div>
                    )
                }
            </div>
            
            <p><MPTimer />&nbsp;seconds</p>   
        </div>
    );
};

export default MPScoreboardScored;