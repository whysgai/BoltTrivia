import store from "./redux/store";
import {
  selectMultiPlayer,
  selectPlayerNumber,
  updatePlayerAvailability,
  setGameConfigs,
  restartGame,
  errorOccurred,
} from "./redux/actions/gameStateActions";
import {
  setMPQuestions,
  stopMPTimer,
  updateMPScores,
  setMPPlayerAnswers,
  setFinalResults,
  awaitFinalResults,
} from "./redux/actions/MPQuestionActions";
import { PLAYER_MODE, GAME_PHASE, END_CONDITION } from "./redux/storeConstants";

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

export const homePageLoaded = () => {
  socket.emit("home page loaded");
};

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
  // socket.off("confirm player multi selection");
});

socket.on("update player availability", (availability) => {
  console.log("server updated availability to: ", availability);
  store.dispatch(updatePlayerAvailability(availability));
});

// Game config selected
export const selectGameConfig = (configs) => {
  if (
    store.getState().gameStateReducer.multiSelect === PLAYER_MODE.MULTI_PLAYER
  ) {
    console.log("Sending configs to server", configs);
    socket.emit("game configs selected", configs);
  }

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("confirm game configs", (configs) => {
  console.log("server approved game config: ", configs);
  store.dispatch(setGameConfigs(configs));
});

socket.on("start game", (questions) => {
  console.log(store.getState().gameStateReducer.multiSelect);
  if (
    store.getState().gameStateReducer.multiSelect === PLAYER_MODE.MULTI_PLAYER
  ) {
    questions.map((question, index) => processQuestion(question));
    store.dispatch(setMPQuestions(questions));
    console.log("Questions from server", questions);
  } else if (store.getState().gameStateReducer.multiSelect === null) {
    console.log("restart game");
    store.dispatch(restartGame(false));
  }
});

// Restart selected
export const selectRestart = () => {
  console.log("Sending restart to server");
  socket.emit("restart selected");

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("restart", () => {
  console.log("Server restarted game");
  if (
    store.getState().gameStateReducer.multiSelect === PLAYER_MODE.MULTI_PLAYER
  ) {
    store.dispatch(stopMPTimer());
    store.dispatch(restartGame(true));
  }
});

socket.on("disconnected", () => {
  console.log("User has disconnected");
  if (
    store.getState().gameStateReducer.multiSelect ===
      PLAYER_MODE.MULTI_PLAYER &&
    store.getState().gameStateReducer.phase !== GAME_PHASE.SELECT_PLAYER
  ) {
    store.dispatch(stopMPTimer());
    store.dispatch(restartGame(true));
  }
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
  store.dispatch(updateMPScores(scores));
});

export const sendPlayerAnswer = (playerIndex, answer) => {
  console.log("Sending players answer to server", answer);
  socket.emit("update player answers", playerIndex, answer);

  // No redux store dispatch needed here because the server
  // will respond to this event with another event(the next one)
};

socket.on("player answers updated", (answers) => {
  console.log("playerAnswersUpdated: ", answers);
  store.dispatch(setMPPlayerAnswers(answers));
});

export const finishMPGame = (playerIndex, condition, time) => {
  console.log("Sending game finish update to server", condition);
  store.dispatch(awaitFinalResults(condition));
  if (condition === END_CONDITION.OTHER_SCORE_REACHED) {
    setTimeout(function () {
      console.log("Pause so player can see wait screen");
      socket.emit("end condition met", playerIndex, condition, time);
    }, 4000);
  } else {
    socket.emit("end condition met", playerIndex, condition, time);
  }
};

socket.on("other player has reached goal", (otherPlayer) => {
  const thisPlayer = store.getState().gameStateReducer.player;
  console.log("Comparing", thisPlayer, " to ", otherPlayer);
  if (thisPlayer !== otherPlayer) {
    console.log("Other player has reached the goal");
    const time = store.getState().MPQuestionReducer.time;
    finishMPGame(thisPlayer, END_CONDITION.OTHER_SCORE_REACHED, time);
  }
});

socket.on("MP game finished", (finalResults) => {
  console.log("Game has finished: ", finalResults);
  store.dispatch(setFinalResults(finalResults));

  // redux action to finish game and set final score
});

socket.on("connect failed", () => {
  console.log("Initial connection failed, please try again");
  store.dispatch(errorOccurred());
});

socket.on("connect_error", (error) => {
  console.log("Couldn't connect to server.");
  socket.disconnect();
  store.dispatch(errorOccurred());
});
