var async = require("async");
var fs = require("fs");

function directorySize(path, cb, size) {
  if (size === undefined) {
    size = 0;
  }

  fs.stat(path, function (err, stat) {
    if (err) {
      cb(err);
      return;
    }

    size += stat.size;

    if (!stat.isDirectory()) {
      cb(null, size);
      return;
    }

    fs.readdir(path, function (err, paths) {
      if (err) {
        cb(err);
        return;
      }

      async.map(
        paths.map(function (p) {
          return path + "/" + p;
        }),
        directorySize,
        function (err, sizes) {
          size += sizes.reduce(function (a, b) {
            return a + b;
          }, 0);
          cb(err, size);
        }
      );
    });
  });
}

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

module.exports = {
  directorySize,
  bytesToSize,
};
