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
    console.log("p1: " + availability[0] + " p2: " + availability[1]);
    socket.off("check availability"); // Prevents duplicate listeners
    return availability;
  });
};

// Player1 or Player2 button clicked
// playerIndex = 0 for player 1, playerIndex = 1 for player 2
// returns new availability array
export const selectPlayerMulti = (playerIndex) => {
  socket.emit("player multi selection", playerIndex);
  socket.on("confirm player multi selection", (availability) => {
    socket.off("confirm player multi selection");
    console.log(availability);
    return availability;
  });
};

// Game type selected (timed/score)
export const selectGameType = (type) => {
  socket.emit("game type selected", type);
  socket.on("confirm game type selection", (gameType) => {
    socket.off("confirm game type selection");
    console.log("gametype: " + gameType);
    return gameType;
  });
};

socket.on("notify all", (data) => console.log(data));
