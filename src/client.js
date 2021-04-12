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

export const selectMultiplayerMode = () => {
  socket.emit("multiplayer selected");
  socket.on("check availability", (availability) => {
    console.log("p1: " + availability[0] + " p2: " + availability[1]);
    socket.off("check availability"); // Prevents duplicate listeners
  });
};

socket.on("notify all", (data) => console.log(data));
