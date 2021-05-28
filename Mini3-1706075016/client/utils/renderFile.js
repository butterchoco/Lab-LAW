var fs = require("fs"),
  path = require("path");

const render = (url) => {
  return (req, res) => {
    fs.readFile(path.join(__dirname, url), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200);
      res.end(data);
      return;
    });
  };
};

module.exports = { render };
