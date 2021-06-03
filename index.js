const express = require("express");
const hubRouter = require("./routers/hub");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
   res.send("<h2>Welcome to the Lambda Hubs API</h>");
});

server.get("/api", (req, res) => {
   res.json({ message: "Welcome to the Hubs API" });
});

server.use("/api/hubs", hubRouter);
// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(8080, () => {
   console.log("\n*** Server Running on http://localhost:8080 ***\n");
});
