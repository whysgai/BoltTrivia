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
    <div className="card card-body config-page">
      <div className="config-copy">
        <h3 className="mt-4 text-center mb-2">
          Choose an available player:
        </h3>
        <h3 className="mb-4">
          Host selects the game type and determines the difficulty and settings for the multiplayer game.
        </h3>
      </div>
      <div className="player-buttons">
        <button
          className="btn btn-primary"
          onClick={() => selectP1()}
          disabled={!playerAvailability[0]}
        >
          <h3 className="config-button-text">Host (P1)</h3>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => selectP2()}
          disabled={!playerAvailability[1]}
        >
          <h3 className="config-button-text">Guest (P2)</h3>
        </button>
      </div>
    </div>
  );
};

export default ChoosePlayer;
