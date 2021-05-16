const archiver = require("archiver");
var fs = require("fs");
const { directorySize, bytesToSize } = require("./utils/archiveHelper");

var npm = "1706075016";

const connection = (props) => {
  const { routingKey } = props;

  return function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const directory = "uploads/";
      const fileUrl = "/temp/" + Date.now() + ".zip";
      const destination = __dirname + fileUrl;
      if (!fs.existsSync("temp")) {
        fs.mkdirSync("temp");
      }

      const destinationStream = fs.createWriteStream(destination);
      channel.assertExchange("1706075016", "topic", { durable: false });

      const url = "http://localhost:8081" + fileUrl;

      directorySize(directory, (err, totalSize) => {
        const prettyTotalSize = bytesToSize(totalSize);
        const archive = archiver("zip");

        archive.on("error", function (err) {
          console.error("Error while zipping", err);
        });

        archive.on("progress", function (progress) {
          var percent =
            100 - ((totalSize - progress.fs.processedBytes) / totalSize) * 100;

          console.log(
            "%s / %s (%d %)",
            bytesToSize(progress.fs.processedBytes),
            prettyTotalSize,
            percent.toFixed(2)
          );
          channel.publish(
            npm,
            routingKey,
            Buffer.from(
              JSON.stringify({
                currentSize: bytesToSize(progress.fs.processedBytes),
                totalSize: prettyTotalSize,
                percent: percent.toFixed(0),
                message: `${bytesToSize(
                  progress.fs.processedBytes
                )}/${prettyTotalSize} (${percent.toFixed(0)}%)`,
                url,
              })
            )
          );
        });

        //on stream closed we can end the request
        archive.on("end", function () {
          console.log("FILE COMPRESSED");
          channel.publish(
            npm,
            routingKey,
            Buffer.from(
              JSON.stringify({
                currentSize: prettyTotalSize,
                totalSize: prettyTotalSize,
                percent: 100,
                message: `${prettyTotalSize}/${prettyTotalSize} (100%)`,
                url,
              })
            )
          );
          fs.rmdirSync("uploads", { recursive: true });
          fs.mkdirSync("uploads");
        });

        archive.pipe(destinationStream);
        archive.directory(directory);
        archive.finalize();
      });
    });
  };
};
module.exports = connection;
