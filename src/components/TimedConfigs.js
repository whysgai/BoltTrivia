import {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { GAME_TYPE } from "../redux/storeConstants";

const TimedConfigs = () => {
    const [configs, setConfigs] = useState({
        gameType: GAME_TYPE.TIME_MODE,
        timeLimit: 60,
        questionCount: 50,
        difficulty: "any"
    });

    return(
        <>
            <p>Set time configs:</p>
            <div className="config">
                <div className="config-inputs">
                    <label className="form-label config-setting">
                        Time limit (seconds):
                        <input className="form-control"
                            type="number" min="1" max="50" 
                            value={configs.timeLimit}
                            onChange={e => setConfigs(
                                {
                                    ...configs,
                                    timeLimit: e.target.value
                                }
                            )}
                        />
                    </label>
                    <label className="form-label config-setting">
                        Difficulty:
                        <select className="form-control"
                            value={props.queryParams.dif}
                            onChange={e => setConfigs(
                                {
                                    ...configs,
                                    difficulty: e.target.value
                                }
                            )}
                        >
                            <option value="any">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>    
                <button className="btn btn-success config-confirm" 
                    
                >
                    <h2 className="big-button-text">START</h2>
                    <span className="little-button-text">START</span>
                </button>
            </div>
        </>
        
    );
};

export default TimedConfigs;