var amqp = require("amqplib/callback_api");
const compressConnection = require("./backgroundProcess");
var path = require("path");
var express = require("express");
var app = express();
var cors = require("cors");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "uploads");
  },
  filename: function (_, file, cb) {
    const fileName = file.fieldname;
    const type = file.mimetype.split("/")[1];
    const today = Date.now();
    cb(null, `${fileName}-${today}.${type}`);
  },
});

var upload = multer({ storage });
const port = Number(process.env.PORT) || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/temp/:id", (req, res) => {
  const { id } = req.params;
  res.download("temp/" + id);
});

app.post("/upload", upload.array("files", 20), (req, res) => {
  const headers = req.headers;
  const files = req.files;

  if (!files)
    return res
      .status(400)
      .send({ error: "Masukkan beberapa file untuk mulai compress!" });

  const routingKey = headers["x-routing-key"];
  amqp.connect("amqp://localhost", compressConnection({ routingKey }));
  res.send({ message: "Upload Success!" });
});

app.listen(port);
console.log(`Server 2 is run in port ${port}!`);
