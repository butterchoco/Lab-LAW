const createError = require("http-errors");
const express = require("express");
const indexRouter = require("./routes/index");
const oauthRouter = require("./routes/oauth");

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/oauth", oauthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
