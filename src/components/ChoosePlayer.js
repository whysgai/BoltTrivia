import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPlayerMulti } from "../client";


const ChoosePlayer = () => {
  const playerAvailability = useSelector(state => state.gameStateReducer.playerAvailability);

  const selectP1 = () => {
    selectPlayerMulti(0);
  };

  const selectP2 = () => {
    selectPlayerMulti(1);
  };

  useEffect(() => {
    console.log("Player availability updated in chose player component");
  }, [playerAvailability]);

  return (
    <>
      <h6 className="mt-4 text-center mb-4">
        Choose an Available Player from Player 1 or Player 2. Player 1 gets to
        Select the Game Configurations while Player 2 waits for the Game to
        Start.
      </h6>
      <button
        className="btn-sm btn-secondary mx-3"
        onClick={() => selectP1()}
        disabled={!playerAvailability[0]}
      >
        Player 1
      </button>
      <button
        className="btn-sm btn-secondary"
        onClick={() => selectP2()}
        disabled={!playerAvailability[1]}
      >
        Player 2
      </button>
    </>
  );
};

export default ChoosePlayer;
