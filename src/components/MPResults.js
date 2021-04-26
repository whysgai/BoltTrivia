import { useSelector } from "react-redux";
import MPResultsCard from "./MPResultsCard";


const MPResults = () => {
    const questions = useSelector(state => state.MPQuestionReducer.questions);
    const answerStrings = useSelector(state => state.MPQuestionReducer.answerStrings);
    const playerAnswers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    const player = useSelector(state => state.gameStateReducer.player);
    const winner = useSelector(state => state.MPQuestionReducer.winner);
    const scores = useSelector(state => state.MPQuestionReducer.scores);
    const scoreGoal = useSelector((state) => state.gameStateReducer.scoreGoal);
    const gameType = useSelector((state) => state.gameStateReducer.type);

    const gameOpponent = () => {
        if (player === 0) {
            return 1
        } else {
            return 0
        }
    }

    const opponent = gameOpponent()

    const calculateWinner = () => {
        if (winner === 'P1' && player === 0) {
            return 'You win!'
        } else if (winner === 'P2' && player === 1) {
            return 'You win!'
        } else if (winner === 'Draw') {
            return 'It was a draw, better luck next time!'
        }
        return 'You lost, try again!'
    }


    return (
        <>
            <h3 className="mb-3">Results: {calculateWinner()}</h3>
            {
                gameType === "SCORE_MODE" ?
                <>
                    <h5>Your Final Score {scores[player]} out of {scoreGoal}.</h5>
                    <h5>Your Opponents Final Score {scores[opponent]} out of {scoreGoal}.</h5>
                </>
                :
                <>
                    <h5>Your Final Score {scores[player]}.</h5>
                    <h5>Your Opponents Final Score {scores[opponent]}.</h5>
                </>
            }
            {console.log("Questions answered", playerAnswers[player].length)}
            <div className="card-group text-center">
                {
                    questions.length > 0 ?
                    <div>
                        
                        {
                            questions.slice(0, playerAnswers[player].length).map((question, index) =>
                                <MPResultsCard question={question} answerString={answerStrings[index]} playerAnswer={playerAnswers[player][index]} opponentAnswer={playerAnswers[opponent][index]}/>                                
                            )
                        }
                    </div>
                    :
                    <>
                        <h3>Loading quiz results...</h3>
                    </>
                }
            </div>
        </>
    )
}

export default MPResults;