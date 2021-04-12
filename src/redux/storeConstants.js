export const PLAYER_MODE = {
    SINGLE_PLAYER = "SINGLE_PLAYER",
    MULTI_PLAYER = "MULTI_PLAYER"
};

export const GAME_MODE = {
    TIME_MODE = "TIME_MODE",
    SCORE_MODE = "SCORE_MODE"
};

export const GAME_PHASE = {
    SELECT_MODE = "SELECT_MODE",
    SET_CONFIGS = "SET_CONFIGS",
    PLAY_GAME = "PLAY_GAME",
    VIEW_SCORES = "VIEW_SCORES"
};

export const INITIAL_STATE = {
    player : null,
    mode : null,
    phase : GAME_PHASE.SELECT_MODE,
    questions : []
};