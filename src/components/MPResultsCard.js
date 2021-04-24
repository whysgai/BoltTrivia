import { useSelector } from "react-redux";


const MPResultsCard = (props) => {
    const question = props.question;
    const answerString = props.answerString;
    const playerAnswer = props.playerAnswer;
    const opponentAnswer = props.opponentAnswer;

    const characterCheck = (value) => {
        return new DOMParser().parseFromString(value, "text/html").body.innerText;
      };

    return (
        <div className="card">
            <div className="card-body">
                {
                    playerAnswer ?
                    <>
                    <h4 className="card-title text-success">
                        Correct
                    </h4>
                    <label className="card-title">
                        {characterCheck(question.question)}
                    </label>
                    </>
                    :
                    <>
                    <h4 className="card-title text-danger">Incorrect</h4>
                    <label className="card-title">
                        {characterCheck(question.question)}
                    </label>
                    </>
                }
                {props.question.allAnswers.map((selection, index) => (
                    <div key={index} className="form-check pb-2">
                    <input
                        required
                        className="form-check-input"
                        disabled={true}
                        type="radio"
                        name="gridRadios"
                        id={"gridRadios" + index}
                        value="type-text"
                    />
                    <label
                        className="form-check-label pb-2"
                        htmlFor={"gridRadios" + index}
                    >
                        {
                            !playerAnswer && answerString === characterCheck(selection) ?
                            <div className='text-danger'>Your Answer: {characterCheck(selection)}</div>
                            :
                            <>
                            {
                                selection === question.correct_answer ?
                                <div className='text-success'>Correct Answer: {characterCheck(selection)}</div>
                                :
                                <div>{characterCheck(selection)}</div>
                            }
                            </>
                        }
                    </label>
                    </div>
                ))}
                {
                    opponentAnswer ?
                    <div className="card-subtitle">Opponent answer: Correct</div>
                    :
                    <div className="card-subtitle">Opponent answer: Incorrect</div>
                }
            </div>
        </div>
    )
}

export default MPResultsCard;