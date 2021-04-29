import PropTypes from "prop-types";
import { GAME_TYPE } from "../redux/storeConstants";

const GameConfigs = (props) => {
  return (
    <>
      {props.configs.gameType === GAME_TYPE.TIME_MODE ? (
        <p>Set configuration for Timed mode:</p>
      ) : (
        <p>Set configurations for Score mode:</p>
      )}
      <form
        className="conditional-config"
        onSubmit={(e) => {
          e.preventDefault();
          props.selectGameConfig(props.configs);
        }}
      >
        <div className="config-inputs">
          {props.configs.gameType === GAME_TYPE.TIME_MODE ? (
              <label className="form-label config-setting">
                Time limit (seconds, max 300):
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  max="300"
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
                Right answers to win (50 max):
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  max="50"
                  value={props.configs.scoreGoal}
                  onChange={(e) =>
                    props.setConfigs({
                      ...props.configs,
                      scoreGoal: parseInt(e.target.value),
                    })
                  }
                />
              </label>
          )}
          <label className="form-label config-difficulty-input">
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
        <button className="btn btn-success config-confirm mb-4 start-game-button" type="submit">
          <h6 className="config-button-text">START</h6>
        </button>
      </form>
    </>
  );
};

export default GameConfigs;

PropTypes.TimedConfigs = {
  selectedType: PropTypes.string.isRequired,
};
