import { useDispatch } from "react-redux";

const PlayerSelect = () => {

    const makePlayerSelection = player => {
        if (player === "P1") {
            //dispatch an action
        } else if (player === "P2") {
            // dispatch an action (maybe the same action with a different value)
        }
    };

    return (
        <>
            <p>Choose your character</p>
            <button className='btn-sm btn-primary' onClick={() => makePlayerSelection("P1")}>P1</button>
            <button className='btn-sm btn-danger' onClick={() => makePlayerSelection("P2")}>P2</button>
        </>
    );
};

export default PlayerSelect;