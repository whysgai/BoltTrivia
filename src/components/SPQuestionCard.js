import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../redux/actions/SPQuestionActions'

const SPQuestionCard = props => {
    const question = props.question;
    const [answer, setAnswer] = useState('');
    const [submit, setSubmit] = useState(false);
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState('')
    const [correctBool, setCorrectBool] = useState('')
    const dispatch = useDispatch();


    const updateCount = () => {
        if (submit) {
            setSubmit(false);
            dispatch(addAnswer(correctBool));
        } else {
            if (answer === characterCheck(question.correct_answer)) {
                setCorrect('Correct!');
                setCorrectBool(true);
            } else {
                setCorrectBool(false);
                setCorrect('Incorrect.');
            }
            setSubmit(true);
        }
    }

    const characterCheck = (value) => {
        return new DOMParser().parseFromString(value, 'text/html').body.innerText;
    }

    return (
        <div>
            <h4 className='pb-3 text-center'>Category: {question.category}</h4>
            <h5>Question: {characterCheck(question.question)}</h5>
            {
                props.multipleChoice.map((selection, index) =>
                    <div className="form-check pb-2">
                        <input className="form-check-input" checked={answer===characterCheck(selection)} disabled={submit}
                            type="radio" name="gridRadios" id="gridRadios1" value="type-text"
                            onClick={() => setAnswer(characterCheck(selection))}/>
                        <label className="form-check-label pb-2" htmlFor="gridRadios1">{characterCheck(selection)}</label>
                    </div>
                )
            }
            {
                !submit ?
                <button className="btn btn-success float-right" onClick={() => updateCount()}>Submit</button>
                :
                <div className="text-center">
                    <h3 className="text-primary">{correct}</h3>
                    <h5 className="text-success">Correct Answer: {characterCheck(question.correct_answer)}</h5>
                    <button className="btn btn-dark float-right" onClick={() => updateCount()}>Next</button>
                </div>
            }
        </div>
    )
}

export default SPQuestionCard;