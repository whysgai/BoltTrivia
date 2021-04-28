import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardScored = () => {
  const player = useSelector((state) => state.gameStateReducer.player);
  const answers = useSelector((state) => state.MPQuestionReducer.playerAnswers);
  const goal = useSelector((state) => state.gameStateReducer.configs.scoreGoal);
  //dummy score history
  // const wins = [true, false, true, true, false, true];
  let p1Answers = [];
  let p1Score = 0;
  let p2Answers = [];
  let p2Score = 0;
  let wins = [];

  if (answers) {
    p1Answers = answers[0];
    p1Score = answers[0].filter((answer) => answer).length;
    p2Answers = answers[1];
    p2Score = answers[1].filter((answer) => answer).length;

    if (player === 0) {
      wins = p1Answers;
    } else {
      wins = p2Answers;
    }
  }

  return (
    <div className="scoreboard card">
      <div className="card-body scored-board ">
        {/* <p>Scoreboard (scored)</p> */}
        <div class="scored-scores">
          <span>
            <h4>
              {player === 0 ? "P1" : "P2"}: {player === 0 ? p1Score : p2Score}
            </h4>
          </span>
          <span>
            <h4>
              {player === 0 ? "P2" : "P1"}: {player === 0 ? p2Score : p1Score}
            </h4>
          </span>
        </div>
        <div className="scored-goal">
          <h4>Goal:&nbsp;{goal}</h4>
        </div>
        <div className="scoreboard-answered list-group-flush">
          {wins.map((question, index) => (
            <div index={index} className="list-group-item">
              Question {index+1}:&nbsp;
              <span className={`${question ? "text-success" : "text-danger"}`}>
                {question ? "Right" : "Wrong"}
              </span>
            </div>
          ))}
        </div>
        <span className="scored-timer">
          <h4>
            <MPTimer />
            &nbsp;seconds
          </h4>
        </span>
      </div>
    </div>
  );
};

export default MPScoreboardScored;
