const logger = require("../util/Log/logger");

const HomeController = (req, res) => {
  const { filename } = req.params;
  logger.debug.debug("Get download file: " + filename);
  res.download("../data/" + filename);
};

module.exports = HomeController;
