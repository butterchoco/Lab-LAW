var fs = require("fs");
const logger = require("../util/Log/logger");

const DriveController = (req, res) => {
  const files = fs.readdirSync("../data");
  logger.debug.debug(files);
  res.status(200).json({ files });
};

module.exports = DriveController;
