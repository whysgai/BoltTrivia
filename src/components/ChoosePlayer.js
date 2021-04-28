import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPlayerMulti } from "../client";

const ChoosePlayer = () => {
  const playerAvailability = useSelector(
    (state) => state.gameStateReducer.playerAvailability
  );

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
      <h6 className="mt-4 text-center mb-2">
        Choose an Available Player from Host or Guest.
      </h6>
      <h6 className="text-center mb-4">
        The Host gets to Select the Game Configurations while the Guest waits
        for the Game to Start.
      </h6>
      <button
        className="btn btn-primary mx-3"
        onClick={() => selectP1()}
        disabled={!playerAvailability[0]}
      >
        Host
      </button>
      <button
        className="btn btn-primary"
        onClick={() => selectP2()}
        disabled={!playerAvailability[1]}
      >
        Guest
      </button>
    </>
  );
};

export default ChoosePlayer;
