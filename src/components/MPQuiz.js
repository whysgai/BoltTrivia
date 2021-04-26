import {useSelector, useDispatch} from "react-redux";
import MPQuestionCard from "./MPQuestionCard"
import { useState } from "react";
import {finishMPGame} from "../client"
import { END_CONDITION } from "../redux/storeConstants";

const MPQuiz = () => {
    const questions = useSelector(state => state.MPQuestionReducer.questions)
    const [start, setStart] = useState(false)
    const count = useSelector(state => state.MPQuestionReducer.count)
    const playerIndex = useSelector(state => state.gameStateReducer.player)
    const time = useSelector((state) => state.MPQuestionReducer.time);


    const endGame = () => {
        console.log("==========OUT OF QUESTIONS=============");
        finishMPGame(playerIndex, END_CONDITION.OUT_OF_QUESTIONS, time);
    }


    return (
        <div className="card">
            {
                !start && questions.length > 0?
                <button onClick={setStart(true)}>Start Quiz</button>
                :
                <div>
                    {
                        questions.length > 0 && count === questions.length ?
                            endGame()
                            :
                            <MPQuestionCard question={questions[count]}/>
                    }
                </div>
            }
        </div>
    )
}

export default MPQuiz;