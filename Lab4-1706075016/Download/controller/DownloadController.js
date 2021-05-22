const logger = require("../util/Log/logger");
const fs = require("fs");
const { archive } = require("../util/Helper/archive");

const DownloadController = (req, res) => {
  let { filename } = req.params;
  const filesJson = JSON.parse(filename);
  console.log(filesJson);
  if (filesJson.length === 1) {
    filename = filesJson[0];
    const dataPath = "../data/" + filename;
    const zipPath = "../temp/" + filename;
    try {
      if (fs.existsSync(dataPath)) {
        logger.debug.debug("Get download file: " + filename);
        res.download(dataPath);
      } else if (fs.existsSync(zipPath)) {
        logger.debug.debug("Get download file: " + filename);
        res.download(zipPath);
      } else {
        res.status(400).json({ error: `File ${filename} Not Found.` });
      }
    } catch (err) {
      res.status(400).json({ error: `File ${filename} Not Found.` });
    }
  } else if (filesJson.length > 1) {
    archive({ files: filesJson })
      .then((response) => {
        console.log(response);
        res.json({ url: response });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    res.status(400).json({ error: `Filename is required.` });
  }
};

module.exports = DownloadController;
