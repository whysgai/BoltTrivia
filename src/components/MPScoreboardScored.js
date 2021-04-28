import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardScored = () => {
    const player = useSelector(state => state.gameStateReducer.player);
    const answers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    const goal = useSelector(state => state.gameStateReducer.configs.scoreGoal);
    //dummy score history
    // const wins = [true, false, true, true, false, true];
    let p1Answers = [];
    let p1Score = 0;
    let p2Answers = [];
    let p2Score = 0;
    let wins = [];

    if (answers) {
        p1Answers = answers[0];
        p1Score = (answers[0].filter(answer => answer)).length;
        p2Answers = answers[1];
        p2Score = (answers[1].filter(answer => answer)).length;
    
        if (player === 0) {
            wins = p1Answers;
        } else {
            wins = p2Answers;
        }
    }

    return (
        <div className="scoreboard scored-board card">
            <div className="card-body">
                <p>Scoreboard (scored)</p>
                        
                <p>{player === 0 ? "P1" : "P2"}'s score: {player === 0 ? p1Score : p2Score}</p>
                <p>{player === 0 ? "P2" : "P1"}'s score: {player === 0 ? p2Score : p1Score}</p>
                <p>Out of&nbsp;{goal}</p>
                <div>
                    {
                        wins.map((question, index) => 
                            <div index={index}>Question {index}: {question ? "Correct" : "Wrong"}</div>
                        )
                    }
                </div>
                <p><MPTimer />&nbsp;seconds</p>
            </div>
        </div>
    );
};

export default MPScoreboardScored;