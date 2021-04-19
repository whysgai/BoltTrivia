import { useSelector } from "react-redux";
import SPQuestionCard from "./SPQuestionCard";
import SPScoreboard from "./SPScoreboard";

const SPQuiz = () => {
  const questions = useSelector((state) => state.SPQuestionReducer.questions);
  const count = useSelector((state) => state.SPQuestionReducer.count);
  const answeredCount = useSelector(
    (state) => state.SPQuestionReducer.answeredCount
  );

  const randomizeMultiple = () => {
    let allAnswers = [];
    allAnswers = [
      questions[answeredCount].correct_answer,
      questions[answeredCount].incorrect_answers[0],
      questions[answeredCount].incorrect_answers[1],
      questions[answeredCount].incorrect_answers[2],
    ];
    for (let i = 0; i < allAnswers.length; i++) {
      const j = Math.floor(Math.random() * i);
      const temp = allAnswers[i];
      allAnswers[i] = allAnswers[j];
      allAnswers[j] = temp;
    }
    return allAnswers;
  };

  return (
    <div>
      {questions.length > 0 && answeredCount < count ? (
        <SPQuestionCard
          question={questions[answeredCount]}
          multipleChoice={randomizeMultiple()}
        />
      ) : answeredCount === count ? (
        <SPScoreboard />
      ) : (
        <>
          <h3>Loading quiz questions...</h3>
        </>
      )}
    </div>
  );
};

export default SPQuiz;
