import { useSelector, useDispatch } from "react-redux";
import { unsetSPBeginQuiz } from "../redux/actions/SPQuestionActions";
import { restartGame } from "../redux/actions/gameStateActions";

const SPScoreboard = () => {
  const answers = useSelector((state) => state.SPQuestionReducer.answers);
  const dispatch = useDispatch();

  const checkRightAnswers = (answers) => {
    return answers.filter((answer) => answer === true).length;
  };
  return (
    <div className="mx-3 my-3">
      <h3>
        {"Your score: " +
          checkRightAnswers(answers) +
          "/" +
          answers.length}
      </h3>
      <p>
        Try and beat your score, or change it up and play with a friend!
      </p>
      <button
        className="btn btn-primary sp-quiz-submit mb-3"
        onClick={() => dispatch(unsetSPBeginQuiz())}
      >
        <h5>New Single Player Game</h5>
      </button>
      <button className="btn btn-dark sp-quiz-submit" onClick={() => dispatch(restartGame(false))}>
        <h5>HOME</h5>
      </button>
    </div>
  );
};

export default SPScoreboard;
