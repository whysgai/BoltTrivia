import { useSelector } from "react-redux";


const MPResults = () => {
    const questions = useSelector(state => state.MPQuestionReducer.questions);
    const answerStrings = useSelector(state => state.MPQuestionReducer.answerStrings);
    const playerAnswers = useSelector(state => state.MPQuestionReducer.playerAnswers);

    return (
        <div className="card-group">
            <h3>RESULTS</h3>
        </div>
    )
}

export default MPResults;