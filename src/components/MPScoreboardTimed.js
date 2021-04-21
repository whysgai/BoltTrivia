import { useSelector } from "react-redux";
import MPTimer from "./MPTimer";

const MPScoreboardTimed = () => {
    const player = useSelector(state => state.gameStateReducer.player);

    return (
        <div>
            <p>Scoreboard (timed)</p>
            <p>Timer Component</p>
            <MPTimer />
            <p>List of {player === 0 ? "P1" : "P2"}'s questions</p>
            <p>{player === 0 ? "P2" : "P1"}'s ratio</p>
        </div>
    );
};

export default MPScoreboardTimed;