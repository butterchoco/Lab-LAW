const express = require("express");
const indexController = require("./controller/index");
const tokenController = require("./controller/token");
const resourceController = require("./controller/resource");
const validate = require("./utils/validationOauth");
const app = express();
var cors = require("cors");
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", indexController);
app.post("/oauth/resource", validate(resourceController));
app.post("/oauth/token", tokenController);

app.get("*", function (_, res) {
  res.status(404).send({ error: "404 Not Found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
