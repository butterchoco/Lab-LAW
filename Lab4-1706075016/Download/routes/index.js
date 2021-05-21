const express = require("express");
const DownloadController = require("../controller/DownloadController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.get("/:filename", DownloadController);

module.exports = router;
