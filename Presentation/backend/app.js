const indexController = require("./controller/index");
const tokenController = require("./controller/token");
const resourceController = require("./controller/resource");
const validate = require("./utils/validationOauth");
const socketIO = require("./socket.io/socket.io");

const socket = require("socket.io");
const express = require("express");
var cors = require("cors");
var multer = require("multer");

const app = express();
var upload = multer();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

app.get("/", indexController);
app.post("/oauth/resource", validate(resourceController));
app.post("/oauth/token", tokenController);

app.get("*", function (_, res) {
  res.status(404).send({ error: "404 Not Found" });
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = socket(server, {
  cors: {
    origin: "*",
  },
});
socketIO(io);
