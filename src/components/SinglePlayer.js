import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  setSPQuestions,
  setSPBeginQuiz,
} from "../redux/actions/SPQuestionActions";
import SPQuiz from "./SPQuiz";
import { errorOccurred } from "../redux/actions/gameStateActions";

const requestTriviaCategories = async () => {
  let response = await fetch("https://opentdb.com/api_category.php");
  let categoryData = await response.json();
  return categoryData;
};

const SinglePlayer = () => {
  const beginQuiz = useSelector((state) => state.SPQuestionReducer.beginQuiz);
  const dispatch = useDispatch();
  const difficulty = ["any difficulty", "easy", "medium", "hard"];

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [categories, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("any category");
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    "any difficulty"
  );

  const SPTriviaQuestions = async (query) => {
    let response = await fetch(
      "https://opentdb.com/api.php" + query + "&type=multiple"
    );
    let triviaData = await response.json();
    return triviaData;
  };

  const assembleURL = (queryParams) => {
    let url = "?amount=" + numberOfQuestions;
    if (selectedCategory !== "any category") {
      url = url + "&category=" + selectedCategory;
    }
    if (selectedDifficulty !== "any difficulty") {
      url = url + "&difficulty=" + selectedDifficulty;
    }
    return url;
  };

  useEffect(() => {
    requestTriviaCategories()
      .then((data) => {
        setCategory(data.trivia_categories);
      })
      .catch((error) => {
        dispatch(errorOccurred());
        console.log(error);
      });
  }, []);

  const beginQuizClick = () => {
    SPTriviaQuestions(assembleURL())
      .then((data) => {
        dispatch(setSPQuestions(data.results));
      })
      .catch((error) => {
        dispatch(errorOccurred());
        console.log(error);
      });
    dispatch(setSPBeginQuiz());
  };

  return (
    <>
      {!beginQuiz ? (
        <>
          <h3 className="mt-4">Single Player</h3>
          <h6 className="mt-4 text-center mb-2">
            Once you select and submit an answer for the 
            multiple choice questions you will be shown whether your answer was correct or incorrect.
            If you chose an incorrect answer the correct answer will be displayed for you. Be careful clicking submit,
            you cannot go back and change your answer!
          </h6>

          <h6 className="mt-4 text-center mb-2">
            Please select your game choices from the options below. 
          </h6>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              beginQuizClick();
            }}
          >
            <div className="config-inputs text-center">
              <div className="col-md-4 mb-3 text-center">
                <label
                  className="form-label config-setting"
                  htmlFor="number-of-questions"
                >
                  Number of Questions (max 50):
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={numberOfQuestions}
                  min={1}
                  max={50}
                  onChange={(e) => setNumberOfQuestions(e.target.value)}
                />
              </div>
            </div>

            <div className="config-inputs">
              <label
                className="form-label config-difficulty-input"
                htmlFor="trivia-category-selection"
              >
                Trivia Category Selection:
              </label>
              <select
                className="form-control"
                value={selectedCategory}
                id={0}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value={"any category"}>any category</option>
                {categories.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="config-inputs">
              <label
                className="form-label config-difficulty-input"
                htmlFor="trivia-difficulty"
              >
                Difficulty:
              </label>
              <select
                className="form-control"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulty.map((diff, index) => (
                  <option value={diff} key={index}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-success config-confirm mb-4 start-game-button" type="submit">
              <h6 className="config-button-text">START</h6>
            </button>
          </form>
        </>
      ) : (
        <>
          <SPQuiz />
        </>
      )}
    </>
  );
};

export default SinglePlayer;
