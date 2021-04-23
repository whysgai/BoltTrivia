import {useSelector, useDispatch} from "react-redux";
import MPQuestionCard from "./MPQuestionCard"
import { useState } from "react";

const MPQuiz = () => {
    const questions = useSelector(state => state.MPQuestionReducer.questions)
    const [start, setStart] = useState(false)
    const count = useSelector(state => state.MPQuestionReducer.count)
    const dispatch = useDispatch();


    return (
        <div className="card">
            {
                !start && questions.length > 0?
                <button onClick={setStart(true)}>Start Quiz</button>
                :
                <div>
                    {
                        questions.length > 0 &&
                        <MPQuestionCard question={questions[count]}/>
                    }
                </div>
            }
        </div>
    )
}

export default MPQuiz;