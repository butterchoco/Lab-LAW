var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (_, res) => res.render("upload-page"));

const port = 8080;
app.listen(port);
console.log(`${port} is the magic port!`);
