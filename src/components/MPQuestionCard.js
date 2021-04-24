import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import {sendPlayerAnswer} from "../client"
import {addMPAnswer} from "../redux/actions/MPQuestionActions"


const MPQuestionCard = (props) => {
    const dispatch = useDispatch();
    const question = props.question;
    const [answer, setAnswer] = useState('');
    const playerIndex = useSelector(state => state.gameStateReducer.player)

    const characterCheck = (value) => {
        return new DOMParser().parseFromString(value, "text/html").body.innerText;
      };

    const submitAnswer = () => {
        console.log("submitAnswer submit")
        if (answer === characterCheck(question.correct_answer)) {
            sendPlayerAnswer(playerIndex,true);
        } else {
            sendPlayerAnswer(playerIndex,false);
        }
        dispatch(addMPAnswer(answer));
    }

    return (
        <div>
            <h4 className="pb-3 text-center">Category: {question.category}</h4>
            <h5>Question: {characterCheck(question.question)}</h5>
            {question.allAnswers.map((selection, index) => (
                <div key={index} className="form-check pb-2">
                    <input
                        required
                        className="form-check-input"
                        checked={answer === characterCheck(selection)}
                        type="radio"
                        name="gridRadios"
                        id={"gridRadios" + index}
                        value="type-text"
                        onChange={() => {
                        setAnswer(characterCheck(selection));
                        }}
                    />
                    <label className="form-check-label pb-2" htmlFor={"gridRadios" + index}>
                        {characterCheck(selection)}
                    </label>
                </div>
            ))}
            <div>
                <button onClick={() => submitAnswer()}>Submit</button>
            </div>
        </div>
    )
}

export default MPQuestionCard;