const express = require("express");
const DriveController = require("../controller/DriveController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.get("/drive", DriveController);

module.exports = router;
