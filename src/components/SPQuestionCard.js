import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "../redux/actions/SPQuestionActions";

const SPQuestionCard = (props) => {
  const question = props.question;
  const totalQuestionCount = useSelector(
    (state) => state.SPQuestionReducer.count
  );
  const answeredCount = useSelector(
    (state) => state.SPQuestionReducer.answeredCount
  );

  const [answer, setAnswer] = useState("");
  const [submit, setSubmit] = useState(false);
  const [valid, setValid] = useState(false);
  const [correct, setCorrect] = useState("");
  const [correctBool, setCorrectBool] = useState("");
  const dispatch = useDispatch();

  const updateCount = () => {
    if (submit) {
      setSubmit(false);
      dispatch(addAnswer(correctBool));
      setValid(false);
    } else {
      if (answer === characterCheck(question.correct_answer)) {
        setCorrect("Correct!");
        setCorrectBool(true);
      } else {
        setCorrectBool(false);
        setCorrect("Incorrect.");
      }
      setSubmit(true);
    }
  };

  const characterCheck = (value) => {
    return new DOMParser().parseFromString(value, "text/html").body.innerText;
  };

  return (
    <div>
      <h4 className="pb-3 text-center">Category: {question.category}</h4>
      <h5>Question: {characterCheck(question.question)}</h5>
      {props.multipleChoice.map((selection, index) => (
        <div key={index} className="form-check pb-2">
          <input
            required
            className="form-check-input"
            checked={answer === characterCheck(selection)}
            disabled={submit}
            type="radio"
            name="gridRadios"
            id={"gridRadios" + index}
            value="type-text"
            onChange={() => {
              setAnswer(characterCheck(selection));
              setValid(true);
            }}
          />
          <label
            className="form-check-label pb-2"
            htmlFor={"gridRadios" + index}
          >
            {characterCheck(selection)}
          </label>
        </div>
      ))}
      {!submit ? (
        <button
          className="btn btn-success float-right"
          onClick={() => updateCount()}
          disabled={!valid}
        >
          Submit
        </button>
      ) : (
        <div className="text-center">
          <h3 className="text-primary">{correct}</h3>
          <h5 className="text-success">
            Correct Answer: {characterCheck(question.correct_answer)}
          </h5>
          {answeredCount === totalQuestionCount - 1 ? (
            <button
              className="btn btn-dark float-right"
              onClick={() => updateCount()}
            >
              Finish
            </button>
          ) : (
            <button
              className="btn btn-dark float-right"
              onClick={() => updateCount()}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SPQuestionCard;
