var fs = require("fs");
const logger = require("../util/Log/logger");

const DriveController = (req, res) => {
  const dir = "../data";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const files = fs.readdirSync(dir);
  logger.debug.debug(files);
  res.status(200).json({ files });
};

module.exports = DriveController;
