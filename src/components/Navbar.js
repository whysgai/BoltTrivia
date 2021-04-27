import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRestart } from "../client";
import { PLAYER_MODE, GAME_PHASE } from "../redux/storeConstants";
import { restartGame, openOnboarding } from "../redux/actions/gameStateActions";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const multiSelect = useSelector(
    (state) => state.gameStateReducer.multiSelect
  );
  const phase = useSelector((state) => state.gameStateReducer.phase);

  const restart = () => {
    if (multiSelect === PLAYER_MODE.SINGLE_PLAYER) {
      dispatch(restartGame(true));
    } else if (
      multiSelect === PLAYER_MODE.MULTI_PLAYER &&
      phase === GAME_PHASE.SELECT_MULTI
    ) {
      dispatch(restartGame(false));
    } else if (
      multiSelect === PLAYER_MODE.MULTI_PLAYER &&
      phase !== GAME_PHASE.SELECT_MULTI
    ) {
      selectRestart();
    } else {
      console.log("Invalid Restart");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <button
        type="button"
        className="btn btn-link navbar-brand"
        onClick={() => restart()}
      >
        Bolt Trivia!
      </button>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-link nav-link"
              onClick={() => restart()}
            >
              Home
            </button>
          </li>
          {phase === GAME_PHASE.SELECT_MULTI && (
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-link nav-link"
                onClick={() => dispatch(openOnboarding())}
              >
                Onboarding
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
