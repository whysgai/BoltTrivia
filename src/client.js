import { useDispatch } from "react-redux";
import store from "./redux/store";
import {
  selectMultiPlayer,
  selectPlayerNumber,
  updatePlayerAvailability,
  gameTypeSelection,
} from "./redux/actions/gameStateActions";

/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to localhost.
// Localhost port must match the port specified in server.js
let host =
  process.env.NODE_ENV === "production"
    ? "app-name.herokuapp.com"
    : "localhost:4002";

let socket = socketIOClient.connect(host, { secure: true });
// Checks which host we're connected to for troubleshooting.
console.log("Connected to " + host);

// Multiplayer Button Clicked
// returns new availability array
export const selectMultiplayerMode = () => {
  socket.emit("multiplayer selected");
  socket.on("check initial player availability", (availability) => {
    console.log(
      "server approved multiplayer selection and sent availability as p1: " +
        availability[0] +
        " p2: " +
        availability[1]
    );
    store.dispatch(selectMultiPlayer(availability));
    socket.off("check initial player availability"); // Prevents duplicate listeners
  });
};

// Player1 or Player2 button clicked
// playerIndex = 0 for player 1, playerIndex = 1 for player 2
// returns new availability array
export const selectPlayerMulti = (playerIndex) => {
  socket.emit("player multi selection", playerIndex);
  // no redux action needed
};

socket.on("confirm player multi selection", (playerIndex) => {
  console.log(
    "server confirmed player as: ",
    playerIndex
  );
  socket.off("confirm player multi selection");
  store.dispatch(selectPlayerNumber(playerIndex));

});

socket.on("update player availability", (availability) => {
  console.log(
    "server updated availability to: ",
    availability
  );
  socket.off("update player availability");
  store.dispatch(updatePlayerAvailability(availability));
});

// Game type button selected (timed/score)
export const selectGameType = (type) => {
  socket.emit("game type selected", type);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("confirm game type selection", (gameType) => {
  console.log("server confirmed game selection: " + gameType);

  // Redux dispatch needed here to update store state
  // to waiting for game type approval,
  // along with the gameType that needs approval
  store.dispatch(gameTypeSelection(gameType));

  socket.off("confirm game type selection");
});

// Game config selected
export const selectGameConfig = (configObject) => {
  socket.emit("game config selected", configObject);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("confirm game config selection", (configObject) => {
  console.log("server approved game config: " + configObject);

  // Redux dispatch needed here to update store state
  // to waiting for game config approval,
  // along with the gameConfig that needs approval

  socket.off("confirm game config selection");
});

socket.on("notify all", (data) => console.log(data));
