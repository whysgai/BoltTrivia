import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unsetSPBeginQuiz } from "../redux/actions/SPQuestionActions";

const SPScoreboard = () => {
  const answers = useSelector((state) => state.SPQuestionReducer.answers);
  const dispatch = useDispatch();

  const checkRightAnswers = (answers) => {
    return answers.filter((answer) => answer === true).length;
  };
  return (
    <>
      <h5>Scoreboard:</h5>
      <p>
        {"You got " +
          checkRightAnswers(answers) +
          " out of " +
          answers.length +
          " questions right"}
      </p>
      <button
        className="btn btn-primary mx-2"
        onClick={() => dispatch(unsetSPBeginQuiz())}
      >
        New Single Player Game
      </button>

      {/* quit game logic */}
      <button className="btn btn-primary">Home</button>
    </>
  );
};

export default SPScoreboard;
