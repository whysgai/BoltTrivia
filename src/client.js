import { useDispatch } from "react-redux";
import store from "./redux/store";
<<<<<<< HEAD
<<<<<<< HEAD
import {
  selectMultiPlayer,
  selectPlayerNumber,
} from "./redux/actions/gameStateActions";
=======
import { selectMultiPlayer, selectPlayerNumber, selectGameType } from "./redux/actions/gameStateActions";
>>>>>>> bc2412a (BT19 refactor: Add dipatch call to selectGameType function)
=======
import { selectMultiPlayer, selectPlayerNumber, gameTypeSelection } from "./redux/actions/gameStateActions";
>>>>>>> aff560a (BT19 fix: Repair overlapping function names)

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
  socket.on("confirm player multi selection", (availability) => {
    console.log(
      "server confirmed player multi selection and sent back availability as: ",
      availability
    );
    store.dispatch(selectPlayerNumber(playerIndex, availability));
    socket.off("confirm player multi selection");
  });
};

// Game type button selected (timed/score)
export const selectGameType = (type) => {
  socket.emit("game type selected", type);
<<<<<<< HEAD

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
=======
  socket.on("confirm game type selection", (gameType) => {
    socket.off("confirm game type selection");
    console.log("gametype: " + gameType);
    store.dispatch(gameTypeSelection(gameType));
  });
>>>>>>> bc2412a (BT19 refactor: Add dipatch call to selectGameType function)
};

socket.on("wait for game type approval", (gameType) => {
  console.log("server now waiting for P2 to approve game type: " + gameType);

  // Redux dispatch needed here to update store state
  // to waiting for game type approval,
  // along with the gameType that needs approval

  socket.off("wait for game type approval");
});

export const approveGameType = (gameType) => {
  socket.emit("approve game type", gameType);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("confirm game type approval", (gameType) => {
  console.log("server approved game type: " + gameType);

  // Redux dispatch needed here to update gameType to the final one

  socket.off("confirm game type approval");
});

socket.on("notify all", (data) => console.log(data));
