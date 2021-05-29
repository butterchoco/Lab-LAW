var fs = require("fs"),
  path = require("path");

const render = (url) => {
  return (req, res) => {
    fs.readFile(url, (err, data) => {
      if (err) {
        console.log(err);
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
