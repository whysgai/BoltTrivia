import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardTimed = () => {
    const player = useSelector(state => state.gameStateReducer.player);
    const answers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    let p1Answers = [];
    let p1Score = 0;
    let p2Answers = [];
    let p2Score = 0;
    let wins = [];
    let total = 0;

    if (answers) {
        p1Answers = answers[0];
        p1Score = answers[0].filter((answer) => answer).length;
        p2Answers = answers[1];
        p2Score = answers[1].filter((answer) => answer).length;
    
        if (player === 0) {
          total = p1Answers.length;
          if (p1Answers.length > 5) {        
            wins = p1Answers.slice(p1Answers.length-5);
          } else {
            wins = p1Answers;
          } 
        } else {
          total = p2Answers.length;
          if (p2Answers.length > 5) {        
            wins = p2Answers.slice(p2Answers.length-5);
          } else {
            wins = p2Answers;
          } 
        }
      }

    return (
        <div className="scoreboard card">
            <div className="card-body timed-board">
                <span className="timed-timer">
                    <h4>
                        <MPTimer />
                        &nbsp;seconds
                    </h4>
                </span>
                <span>
                    <h4>
                    {player === 0 ? "P1" : "P2"}: {player === 0 ? p1Score : p2Score}
                    </h4>
                </span>
                <div className="scoreboard-answered list-group-flush">
                    {
                        total > 5 ?
                        <div className="list-group-item">...</div>
                        :
                        <></>
                    }
                    {wins.map((question, index) => (
                        <div key={index} className="list-group-item">
                        Question {total > 5 ? total-5+index+1 : index+1}:&nbsp;
                        <span className={`${question ? "text-success" : "text-danger"}`}>
                            {question ? "Right" : "Wrong"}
                        </span>
                        </div>
                    ))}
                </div>
                <span className="timed-opponent-score">
                    <h4>
                        {player === 0 ? "P2" : "P1"}: {player === 0 ? p2Score : p1Score}
                    </h4>
                </span>
            </div>
        </div>
    );
};

export default MPScoreboardTimed;