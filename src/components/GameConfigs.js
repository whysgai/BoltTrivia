import { useState } from "react";
import PropTypes from "prop-types";
import { GAME_TYPE } from "../redux/storeConstants";
import { selectGameConfig } from "../client";

const GameConfigs = (props) => {
  const [configs, setConfigs] = useState({
    gameType: props.selectedType,
    timeLimit: props.selectedType === GAME_TYPE.TIME_MODE ? 60 : "none",
    questionCount: 50,
    difficulty: "any",
  });

  return (
    <>
      <p>Set time configs:</p>

      <div className="config">
        <div className="config-inputs">
          {props.selectedType === GAME_TYPE.TIME_MODE ? (
            <label className="form-label config-setting">
              Time limit (seconds, max 120):
              <input
                className="form-control"
                type="number"
                min="1"
                max="120"
                value={configs.timeLimit}
                onChange={(e) =>
                  setConfigs({
                    ...configs,
                    timeLimit: e.target.value,
                  })
                }
              />
            </label>
          ) : (
            <label className="form-label config-setting">
              Number of questions (50 max):
              <input
                className="form-control"
                type="number"
                min="1"
                max="50"
                value={configs.questionCount}
                onChange={(e) =>
                  setConfigs({
                    ...configs,
                    questionCount: e.target.value,
                  })
                }
              />
            </label>
          )}
          <label className="form-label config-setting">
            Difficulty:
            <select
              className="form-control"
              value={configs.difficulty}
              onChange={(e) =>
                setConfigs({
                  ...configs,
                  difficulty: e.target.value,
                })
              }
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
        {/* selectGameConfig  */}
        <button
          className="btn btn-success config-confirm"
          onClick={() => selectGameConfig(configs)}
        >
          <span className="little-button-text">START</span>
        </button>
      </div>
    </>
  );
};

export default GameConfigs;

PropTypes.TimedConfigs = {
  selectedType: PropTypes.string.isRequired,
};
