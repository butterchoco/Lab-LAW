const express = require("express");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/:filename", HomeController);

module.exports = router;
