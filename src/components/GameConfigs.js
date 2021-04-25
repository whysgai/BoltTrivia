import { useState } from "react";
import PropTypes from "prop-types";
import { GAME_TYPE } from "../redux/storeConstants";
import { selectGameConfig } from "../client";

const GameConfigs = (props) => {

  return (
    <>
      <p>Set time configs:</p>

      <div className="config">
        <div className="config-inputs">
          {props.configs.gameType === GAME_TYPE.TIME_MODE ? (
            <label className="form-label config-setting">
              Time limit (seconds, max 120):
              <input
                className="form-control"
                type="number"
                min="1"
                max="120"
                value={props.configs.timeLimit}
                onChange={(e) =>
                  props.setConfigs({
                    ...props.configs,
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
                value={props.configs.questionCount}
                onChange={(e) =>
                  props.setConfigs({
                    ...props.configs,
                    questionCount: parseInt(e.target.value),
                  })
                }
              />
            </label>
          )}
          <label className="form-label config-setting">
            Difficulty:
            <select
              className="form-control"
              value={props.configs.difficulty}
              onChange={(e) =>
                props.setConfigs({
                  ...props.configs,
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
        <button
          className="btn btn-success config-confirm"
          onClick={() => props.selectGameConfig(props.configs)}
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
