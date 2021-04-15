import {SELECT_SINGLE_PLAYER_TYPE, SELECT_MULTI_PLAYER_TYPE, SELECT_PLAYER_NUMBER, UPDATE_PLAYER_AVAILABILITY,
    SELECT_GAME_TYPE } from "../actionConstants";
import { selectMultiplayerMode } from "../../client";
import { useDispatch } from "react-redux";

export const connectSinglePlayerMode = () => ({
    type: SELECT_SINGLE_PLAYER_TYPE
});

// export const connectMultiPlayerMode = () => {
//     return dispatch => {
//         selectMultiplayerMode()
//             .then(availability => {
//                 console.log("Action after client function", availability);
//                 dispatch(selectMultiPlayer(availability));
//             }).catch(error => {
//                 console.log("Error talking to the server!");
//             });
//     };
// };

export const selectMultiPlayer = (availability) => ({
    type: SELECT_MULTI_PLAYER_TYPE,
    payload: {
        availability
    }
});

// export const selectPlayerNumber = (playerNumber, playerAvailability) => ({
//     type: SELECT_PLAYER_NUMBER,
//     payload: {
//         playerNumber,
//         playerAvailability
//     }
// });

export const selectPlayerNumber = (playerNumber) => ({
    type: SELECT_PLAYER_NUMBER,
    payload: {
        playerNumber
    }
});

export const updatePlayerAvailability = (playerAvailability) => ({
    type: UPDATE_PLAYER_AVAILABILITY,
    payload: {
        playerAvailability
    }
});

export const gameTypeSelection = (gameType) => ({
    type: SELECT_GAME_TYPE,
    payload: {
        gameType
    }
});