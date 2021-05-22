const express = require("express");
const DownloadController = require("../controller/DownloadController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.get(
  process.env.NODE_ENV === "production" ? "/:filename" : "/download/:filename",
  DownloadController
);

module.exports = router;
