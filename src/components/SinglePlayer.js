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
        dispatch(errorOccurred())
        console.log(error);
      });
  }, []);

  const beginQuizClick = () => {
    SPTriviaQuestions(assembleURL())
      .then((data) => {
        dispatch(setSPQuestions(data.results));
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setSPBeginQuiz());
  };

  return (
    <>
      {!beginQuiz ? (
        <>
          <p>
            You have chosen Single Player mode. Please select your game choices
            from the options below.
          </p>

          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label className="form-label mt-3" htmlFor="number-of-questions">
                Number of Questions:
              </label>
              <input
                className="form-control"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label
              className="form-label mt-3 mr-3"
              htmlFor="trivia-category-selection"
            >
              Trivia Category Selection:
            </label>
            <select
              className="form-select"
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

          <div className="form-group">
            <label
              className="form-label mt-3 pt-3 mr-3"
              htmlFor="trivia-difficulty"
            >
              Difficulty:
            </label>
            <select
              className="form-select"
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
          <button
            className="btn btn-success mt-4"
            onClick={() => beginQuizClick()}
          >
            Begin Quiz!
          </button>
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
