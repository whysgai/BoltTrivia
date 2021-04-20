import { useDispatch } from "react-redux";
import store from "./redux/store";
import {
  selectMultiPlayer,
  selectPlayerNumber,
  updatePlayerAvailability,
  gameTypeSelection,
  setGameConfigs,
} from "./redux/actions/gameStateActions";
import { setMPQuestions } from "./redux/actions/MPQuestionActions";

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
  console.log("server confirmed player as: ", playerIndex);
  store.dispatch(selectPlayerNumber(playerIndex));
  socket.off("confirm player multi selection");
});

socket.on("update player availability", (availability) => {
  console.log("server updated availability to: ", availability);
  store.dispatch(updatePlayerAvailability(availability));
});

// // Game type button selected (timed/score)
// export const selectGameType = (type) => {
//   socket.emit("game type selected", type);

//   // No redux store dispatch needed here because the server
//   // will respond to this event with another event(the next one)
// };

// socket.on("confirm game type selection", (gameType) => {
//   console.log("server confirmed game selection: " + gameType);

//   // Redux dispatch needed here to update store state
//   // to waiting for game type approval,
//   // along with the gameType that needs approval
//   store.dispatch(gameTypeSelection(gameType));

//   socket.off("confirm game type selection");
// });

// Game config selected
export const selectGameConfig = (configs) => {
  console.log("Sending configs to server", configs);
  socket.emit("game configs selected", configs);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("confirm game configs", (configs) => {
  console.log("server approved game config: ", configs);
  store.dispatch(setGameConfigs(configs));
  socket.off("confirm game configs");
});

socket.on("start game", (questions) => {
  questions.map((question, index) => processQuestion(question));
  store.dispatch(setMPQuestions(questions));
});

socket.on("notify all", (data) => console.log(data));

const decodeText = (txt) => {
  return new DOMParser().parseFromString(txt, "text/html").body.innerText;
};

const processQuestion = (question) => {
  question.question = decodeText(question.question);
  let allAnswers = [];
  question.incorrect_answers.map((answer) =>
    allAnswers.push(decodeText(answer))
  );
  allAnswers.push(question.correct_answer);
  let i, j, k;
  for (i = 0; i < allAnswers.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    k = allAnswers[i];
    allAnswers[i] = allAnswers[j];
    allAnswers[j] = k;
  }
  question.allAnswers = allAnswers;
  return question;
};

export const updatePlayerScore = (playerIndex, pointsToAdd) => {
  console.log("Sending updated player to server", pointsToAdd);
  socket.emit("update player score", playerIndex, pointsToAdd);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("player scores updated", (scores) => {
  console.log("playerScoreUpdated: ", scores);

  // redux action to update all player scores (e.g. below)
  // store.dispatch(setUpdatedPlayerScores(scores));
});
