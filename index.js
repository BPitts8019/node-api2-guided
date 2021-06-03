const express = require("express");
const welcomeRouter = require("./routers/welcome");
const hubRouter = require("./routers/hub");

const server = express();

server.use(express.json());

server.use("/", welcomeRouter);
server.use("/api/hubs", hubRouter);
// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(8080, () => {
   console.log("\n*** Server Running on http://localhost:8080 ***\n");
});
