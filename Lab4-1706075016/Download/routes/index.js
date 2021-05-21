const express = require("express");
const DownloadController = require("../controller/DownloadController");
const HomeController = require("../controller/DownloadController");

const router = express.Router();

router.get("/:filename", DownloadController);
router.get("/", HomeController);

module.exports = router;
