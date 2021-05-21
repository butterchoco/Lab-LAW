const logger = require("../util/Log/logger");

const HomeController = (req, res) => {
  const { filename } = req.params;
  if (filename) {
    logger.debug.debug("Get download file: " + filename);
    res.download("../data/" + filename);
  } else {
    res.send("Download Page");
  }
};

module.exports = HomeController;
