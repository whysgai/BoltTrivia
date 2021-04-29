import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import {finishMPGame, sendPlayerAnswer} from "../client"
import {addMPAnswer} from "../redux/actions/MPQuestionActions"
import { GAME_TYPE, END_CONDITION } from "../redux/storeConstants";


const MPQuestionCard = (props) => {
    const dispatch = useDispatch();
    const question = props.question;
    const [answer, setAnswer] = useState('');
    const playerIndex = useSelector(state => state.gameStateReducer.player);
    const answers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    const time = useSelector((state) => state.MPQuestionReducer.time);
    const gameType = useSelector(state => state.gameStateReducer.type);
    const goal = useSelector(state => state.gameStateReducer.configs.scoreGoal);

    const characterCheck = (value) => {
        return new DOMParser().parseFromString(value, "text/html").body.innerText;
      };

    const submitAnswer = () => {
        let numRight = 0;
        for (let answer of answers[playerIndex]) {
          if (answer) {
            numRight++;
          }
        }
        if (answer === characterCheck(question.correct_answer)) {
            sendPlayerAnswer(playerIndex,true);
            if (gameType === GAME_TYPE.SCORE_MODE && numRight === goal - 1) {
                console.log("==========GOAL REACHED=============");
                finishMPGame(playerIndex, END_CONDITION.SCORE_REACHED, time);
            }
        } else {
            sendPlayerAnswer(playerIndex,false);
        }
        dispatch(addMPAnswer(answer));
    }

    return (
        <div>
            <div className="card-subtitle mp-quiz-category">
                <span>Category: {question.category}</span>
                <span>Question # {props.count+1}</span>
            </div>
            <h3 className="card-title mp-quiz-question">Question: {characterCheck(question.question)}</h3>
            <div className="seperator"/>
            <div className="quiz-answer-list">
                { question.allAnswers.map((selection, index) => (
                    <div key={index} className="mp-quiz-answer">
                        <input
                            required
                            className="form-check-input btn-check"
                            checked={answer === characterCheck(selection)}
                            type="radio"
                            name="gridRadios"
                            id={"gridRadios" + index}
                            value="type-text"
                            onChange={() => {
                            setAnswer(characterCheck(selection));
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
                            htmlFor={"gridRadios" + index}>
                            {characterCheck(selection)}
                        </label>
                    </div>
                ))}
                <div className="seperator"/>
                <button className="btn btn-primary mp-quiz-submit" onClick={() => submitAnswer()}><h3>Submit</h3></button>
            </div>
        </div>
    )
}

export default MPQuestionCard;