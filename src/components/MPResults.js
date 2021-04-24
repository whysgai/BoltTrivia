import { useSelector } from "react-redux";
import MPResultsCard from "./MPResultsCard";


const MPResults = () => {
    // const questions = useSelector(state => state.MPQuestionReducer.questions);
    // const answerStrings = useSelector(state => state.MPQuestionReducer.answerStrings);
    // const playerAnswers = useSelector(state => state.MPQuestionReducer.playerAnswers);
    // const player = useSelector(state => state.gameStateReducer.player);
    // const winner = useSelector(state => state.MPQuestionReducer.winner);
    // const scores = useSelector(state => state.MPQuestionReducer.scores);

    //FAKE DATA FOR TESTING
    const questions = [
        {
            category: "Entertainment: Books",
            correct_answer: "Hans Christian Andersen",
            difficulty: "medium",
            incorrect_answers: ["Charles Dickens", "Lewis Carroll", "Oscar Wilde"],
            question: "Who wrote the children&#039;s story &quot;The Little Match Girl&quot;?",
            type: "multiple",
            allAnswers: ["Charles Dickens", "Hans Christian Andersen", "Lewis Carroll", "Oscar Wilde"]
        },
        {category: "Entertainment: Music",
        correct_answer: "White",
        difficulty: "medium",
        incorrect_answers: (3) ["Black", "Blue", "Yellow"],
        question: "EDM producer Marshmello performs live wearing clothes and a marshmallow mask of what colour?",
        type: "multiple",
        allAnswers: ["Black", "Blue", "White", "Yellow"]
        },
        {category: "Science & Nature",
        correct_answer: "Sputnik 1",
        difficulty: "easy",
        incorrect_answers: (3) ["Soyuz 7K-OK", "Zenit-2", "Voskhod 3KV"],
        question: "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
        type: "multiple",
        allAnswers: ["Sputnik 1", "Soyuz 7K-OK", "Zenit-2", "Voskhod 3KV"]},
        {category: "General Knowledge",
        correct_answer: "London Liverpool Street",
        difficulty: "medium",
        incorrect_answers: (3) ["Frankfurt (Main) Hauptbahnhof", "Paris Gare du Nord", "Brussels Midi"],
        question: "Amsterdam Centraal station is twinned with what station?",
        type: "multiple",
        allAnswers: ["Frankfurt (Main) Hauptbahnhof", "London Liverpool Street", "Paris Gare du Nord", "Brussels Midi"]}
    ]
    const answerStrings = ["Charles Dickens", "White", "Soyuz 7K-OK", "London Liverpool Street"]
    const playerAnswers = [[false, true, false, true], [true, true, false, true]]
    const player = 0;
    const winner = 'P2'
    const scores = [2,3]



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