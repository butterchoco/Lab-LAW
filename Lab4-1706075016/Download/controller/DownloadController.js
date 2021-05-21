const logger = require("../util/Log/logger");
const fs = require("fs");

const DownloadController = (req, res) => {
  const { filename } = req.params;
  const path = "../data/" + filename;
  try {
    if (fs.existsSync(path)) {
      logger.debug.debug("Get download file: " + filename);
      res.download(path);
    }
  } catch (err) {
    res.status(400).json({ error: "File Not Found." });
  }
};

module.exports = DownloadController;
