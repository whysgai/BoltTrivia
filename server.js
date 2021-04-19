const fetch = require('node-fetch');
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
  let url = OPEN_TDB_URL + "?amount=" + gameConfigs.questionCount;
  // url = url + "&category=any";
  if (gameConfigs.difficulty !== "any") {
    url = url + "&difficulty=" + gameConfigs.difficulty;
  }
  return url;
};

const contactAPI = (gameConfigs) => {
  let url = assembleURL(gameConfigs);
  readQuestions(url)
    .then((data) => {
      console.log("data:", data);
      // data.results.map((result, index) => {
      //   console.log("Raw result", result);
      //   // result.all_answers = processQuestion(result);
      //   // result.question = decode(result.question);
      //   let newResult = processQuestion(result);
      //   console.log("Processed result", newResult);
      //   return newResult;
      // });
      // console.log("Post set-questions:", data.results);
      // setQuestions(data.results);
      // setStatus(STATUS.SUCCESS);
      questionList = data.results;
    })
    .catch((error) => {
      //setStatus(STATUS.FAIL);
      console.log(error);
    });
};

// const decodeText = (txt) => {
//   return new DOMParser().parseFromString(txt, "text/html").body.innerText;
// };

// const processQuestion = (question) => {
//   console.log("Process question:", question);
//   question.question = decodeText(question.question);
//   let allAnswers = [];
//   question.incorrect_answers.map((answer) => allAnswers.push(decodeText(answer)));
//   allAnswers.push(question.correct_answer);

//   let i, j, k;
//   for (i = 0; i < allAnswers.length; i++) {
//     j = Math.floor(Math.random() * (i + 1));
//     k = allAnswers[i];
//     allAnswers[i] = allAnswers[j];
//     allAnswers[j] = k;
//   }
//   question.allAnswers = allAnswers;

//   return question;
// };

// This array keeps track of availability of both players,
// which will help UI determine which button to disable, if any
let playerAvailability = [true, true];
let gameType = null;
let gameConfigs = {};
let questionList = [];

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

  // client.on("game type selected", (type) => {
  //   gameType = type;
  //   // send to all clients
  //   io.sockets.emit("confirm game type selection", gameType);
  // });

  client.on("game configs selected", (configSettings) => {
    console.log("Sever recieved configs", configSettings);
    gameType = configSettings.gameType;
    gameConfigs = { ...configSettings };
    // send to all clients
    io.sockets.emit("confirm game configs", { ...gameConfigs });
    // request from API
    contactAPI(gameConfigs);
    // process questions
    // start the game
  });
});

// Will

// Mikayla
