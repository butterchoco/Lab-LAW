const express = require("express");
const UploadController = require("../controller/UploadController");
const HomeController = require("../controller/HomeController");
const multer = require("multer");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "../data");
  },
  filename: function (_, file, cb) {
    const fileName = file.fieldname;
    const type = file.mimetype.split("/")[1];
    const today = Date.now();
    cb(null, `${fileName}-${today}.${type}`);
  },
});

var upload = multer({ storage });

router.get("/", HomeController);
router.post("/", upload.array("files", 20), UploadController);

module.exports = router;
