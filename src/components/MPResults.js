import { useSelector } from "react-redux";
import MPResultsCard from "./MPResultsCard";


const MPResults = () => {
    const questions = useSelector(state => state.MPQuestionReducer.questions);
    const answerStrings = useSelector(state => state.MPQuestionReducer.answerStrings);
    const playerAnswers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    const player = useSelector(state => state.gameStateReducer.player);
    const winner = useSelector(state => state.MPQuestionReducer.winner);
    const scores = useSelector(state => state.MPQuestionReducer.scores);

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
            <h5>Your Final Score {scores[player]}.</h5>
            <h5>Your Opponents Final Score {scores[opponent]}.</h5>
            <div className="card-group text-center">

                {
                    questions.length > 0 ?
                    <div>
                        
                        {
                            questions.map((question, index) => 
                                {
                                    index < playerAnswers[player].length ?
                                        <MPResultsCard question={question} answerString={answerStrings[index]} playerAnswer={playerAnswers[player][index]} opponentAnswer={playerAnswers[opponent][index]}/>
                                        :
                                        <></>
                                }
                                
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