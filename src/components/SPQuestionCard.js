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
    <div className="mt-3 mx-3 mb-3">
      <div className="card-subtitle sp-quiz-category">
        <span className="pb-3 text-center">Category: {question.category}</span>
        <span>Question # {props.answeredCount+1}</span>
      </div>
      <h3 className="card-title sp-quiz-question">Question: {characterCheck(question.question)}</h3>
      <div className="seperator"/>
    { !submit ? (
      <div>
        <div className="quiz-answer-list">
          {props.multipleChoice.map((selection, index) => (
            <div key={index} className="sp-quiz-answer">
              <input
                required
                className="form-check-input btn-check"
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
                className={`form-check-label btn
                  ${
                    answer === characterCheck(selection) ?
                      "btn-dark"
                      :
                      "btn-outline-dark"
                  }
                `}
                htmlFor={"gridRadios" + index}
              >
                {characterCheck(selection)}
              </label>
            </div>
          ))}
        </div>

        <div className="seperator"/>
          <button
            className="btn btn-primary sp-quiz-submit"
            onClick={() => updateCount()}
            disabled={!valid}
          >
            <h3>SUBMIT</h3>
          </button>
      </div>
      ) : (
      <div>
        <div className="quiz-answer-list">
        {props.multipleChoice.map((selection, index) => (
          <div key={index} className="sp-quiz-answer">
            <input
              required
              className="form-check-input btn-check"
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
              className={`form-check-label btn
                ${
                  answer === characterCheck(selection) && correctBool ?
                    "btn-success"
                    :
                    (
                      answer === characterCheck(selection) && !correctBool ?
                      "btn-danger"
                      :
                      (
                        selection === question.correct_answer ?
                        "btn-success"
                        :
                        "btn-outline-dark"
                      )
                    )
                }
              `}
              htmlFor={"gridRadios" + index}
            >
              {characterCheck(selection)}
            </label>
          </div>
        ))}
        </div>

        <div className="seperator"/>
        <div className="text-center">
          <h3 className={`
                ${
                  correctBool ?
                    "text-success"
                    :
                    "text-danger"
                }
              `}>{correct}</h3>
          {answeredCount === totalQuestionCount - 1 ? (
            <button
              className="btn btn-dark sp-quiz-submit"
              onClick={() => updateCount()}
            >
              <h3>FINISH</h3>
            </button>
          ) : (
            <button
              className="btn btn-dark sp-quiz-submit"
              onClick={() => updateCount()}
            >
              <h3>NEXT</h3>
            </button>
          )}
        </div>
    </div>
    )}
  </div>
  );
};

export default SPQuestionCard;
