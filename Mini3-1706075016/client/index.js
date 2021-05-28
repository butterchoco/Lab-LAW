const express = require("express");
const { render } = require("./utils/renderFile");
const { MiniProjectService } = require("./protoConfig");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", render("views/index.html"));
app.get("/download", (req, res) => {
  const { filename } = req.params;
  res.download("../saved/" + filename);
});
app.post("/download", (req, res) => {
  const { url } = req.body;
  MiniProjectService.download(url, (err, data) => {
    if (err) res.status(404).json({ message: "Url not found." });
    else res.status(200).json(data);
  });
});

const port = 3000;
app.listen(port);
console.log(`${port} is the magic port!`);
