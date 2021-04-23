const fetch = require("node-fetch");
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

// The API URL for the Open Trivia Database
const OPEN_TDB_URL = "https://opentdb.com/api.php";

const readQuestions = async (url) => {
  {
    console.log("Requesting from: ", url);
  }
  let response = await fetch(url);
  let questions = await response.json();
  return questions;
};

const assembleURL = (gameConfigs) => {
  // let url = OPEN_TDB_URL + "?amount=" + gameConfigs.questionCount;
  let url = OPEN_TDB_URL + "?amount=50";
  // url = url + "&category=any";
  if (gameConfigs.difficulty !== "any") {
    url = url + "&difficulty=" + gameConfigs.difficulty;
  }
  url = url + "&type=multiple";
  return url;
};

const contactAPI = (gameConfigs) => {
  let url = assembleURL(gameConfigs);
  readQuestions(url)
    .then((data) => {
      //console.log("data:", data);
      // setStatus(STATUS.SUCCESS);
      questionList = data.results;
      io.sockets.emit("start game", [...questionList]);
    })
    .catch((error) => {
      //setStatus(STATUS.FAIL);
      console.log(error);
    });
};

// This array keeps track of availability of both players,
// which will help UI determine which button to disable, if any
let playerAvailability = [true, true];
let gameType = null;
let gameConfigs = {};
let questionList = [];
let playerScores = [0, 0];

io.on("connection", (client) => {
  io.sockets.emit("notify all", `Client ${client.id} has connected`);

  client.on("multiplayer selected", () => {
    console.log(`Multiplayer mode has been selected`);
    client.emit("check initial player availability", [...playerAvailability]);
  });

  client.on("player multi selection", (playerIndex) => {
    console.log(`Player ${playerIndex} has been selected`);
    playerAvailability[playerIndex] = false;
    client.emit("confirm player multi selection", playerIndex);

    console.log("Server is sending playerAvailability", playerAvailability);
    io.sockets.emit("update player availability", [...playerAvailability]);
  });

  client.on("game configs selected", (configSettings) => {
    console.log("Sever recieved configs", configSettings);
    gameType = configSettings.gameType;
    gameConfigs = { ...configSettings };
    // send to all clients
    io.sockets.emit("confirm game configs", { ...gameConfigs });
    // request from API and start the game
    contactAPI(gameConfigs);
  });

  client.on("restart selected", () => {
    console.log("Server recieved game restart");
    playerAvailability = [true, true];
    gameType = null;
    gameConfigs = {};
    questionList = [];
    playerScores = [0, 0];
    console.log("Sever restarted multiplayer availability", playerAvailability);
    io.sockets.emit("restart")
  })

  client.on("update player score", (playerIndex, pointsToAdd) => {
    console.log(
      "updating score for player " +
        playerIndex +
        " with " +
        pointsToAdd +
        " points."
    );

    playerScores[playerIndex] += pointsToAdd;
    io.sockets.emit("player scores updated", [...playerScores]);
  });

  client.on("finish MP game", () => {
    console.log("finishing MP game");

    io.sockets.emit("MP game finished", [...playerScores]);
    playerAvailability = [true, true];
    gameType = null;
    gameConfigs = {};
    questionList = [];
    playerScores = [0, 0];
  })

  client.on('disconnect', () => {
    io.sockets.emit('disconnected'); 
    playerAvailability = [true, true];
    gameType = null;
    gameConfigs = {};
    questionList = [];
    playerScores = [0, 0];
  });
});
