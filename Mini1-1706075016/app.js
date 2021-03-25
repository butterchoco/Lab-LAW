const express = require("express");
const indexController = require("./controller/index");
const tokenController = require("./controller/token");
const resourceController = require("./controller/resource");
const validate = require("./utils/validationOauth");
const app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const port = Number(process.env.PORT) || 8000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

app.get("/", indexController);
app.post("/oauth/resource", validate(resourceController));
app.post("/oauth/token", tokenController);

app.get("*", function (_, res) {
  res.status(404).send({ error: "404 Not Found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
