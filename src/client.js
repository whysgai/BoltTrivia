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

export const orderPizzas = (numPizzas, callbackFunction) => {
  socket.emit("pizzas", numPizzas);

  socket.on("delivery", (msg) => {
    console.log(msg + " delivered");
    socket.off("delivery"); // Prevents duplicate listeners
    callbackFunction(msg + " delivered");
  });
};

socket.on("notify all", (data) => console.log(data));
