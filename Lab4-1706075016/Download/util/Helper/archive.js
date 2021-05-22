const fs = require("fs");
const archiver = require("archiver");

const archive = ({ files }) => {
  return new Promise((resolve, reject) => {
    const filename = Date.now() + ".zip";
    const fileUrl = "../temp/" + filename;
    if (!fs.existsSync("../temp")) {
      fs.mkdirSync("../temp");
    }
    const output = fs.createWriteStream(fileUrl);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", function (err) {
      reject("");
    });
    archive.on("progress", function (err) {
      console.log("test");
    });

    //on stream closed we can end the request
    archive.on("end", function () {
      resolve(filename);
    });

    archive.pipe(output);
    files.forEach((e) => {
      const path = "../data/" + e;
      if (fs.existsSync(path)) {
        archive.append(fs.createReadStream(path), { name: e });
      }
    });
    archive.finalize();
  });
};

module.exports = { archive };
