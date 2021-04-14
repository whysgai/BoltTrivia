// Server config stuff goes here

// Server attributes go here:
// quiz questions (array)
// player1 (object)
// player2 (object)

// server behaviors
//io.on("connection" ...)

//  emit "joined server" to client on connection
//  assign client to p1/p2
//  emit "other player joined" to other client (if present) on connection

//  select game mode (from p1) and emit to p2

//  recieve p2 approval for game mode

//  select configuration (from p1)
//  recieve p2 approval for configuration

//  emit start game (to all)
//      send all questions

//  recieve answer for each question (emit to other player)

//  end game (to all) and emit scoreboard

// Kaiz

/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require("http").Server(app);
// The origin is used by CORS
const origin =
  process.env.NODE_ENV === "production"
    ? "app-name.herokuapp.com"
    : "http://localhost:3000";
const io = require("socket.io")(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});
const path = require("path");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join((__dirname = "build/index.html")));
  });
}

// When on localhost, serve from the public folder.
// Rule will not be written if production conditional has executed.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

// This array keeps track of availability of both players,
// which will help UI determine which button to disable, if any
let playerAvailability = [true, true];
let gameType = null;
let gameConfig = {};

io.on("connection", (client) => {
  io.sockets.emit("notify all", `Client ${client.id} has connected`);

  client.on("multiplayer selected", () => {
    console.log(`Multiplayer mode has been selected`);
    client.emit("check initial player availability", [...playerAvailability]);
  });

  client.on("player multi selection", (playerIndex) => {
    console.log(`Player ${playerIndex} has been selected`);
    playerAvailability[playerIndex] = false;
    console.log(playerAvailability);
    client.emit("confirm player multi selection", [...playerAvailability]);
  });

  client.on("game type selected", (type) => {
    gameType = type;
    // send to all clients
    io.sockets.emit("wait for game type approval", gameType);
  });

  client.on("approve game type", (type) => {
    gameType = type;
    // send to all clients
    io.sockets.emit("confirm game type approval", gameType);
  });

  client.on("game config selected", (configObject) => {
    gameConfig = { ...configObject };
    // send to all clients
    io.sockets.emit("wait for game config approval", { ...gameConfig });
  });
});

// Will

// Mikayla
