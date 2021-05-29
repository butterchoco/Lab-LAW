const amqp = require("amqplib/callback_api");
const { spawn } = require("child_process");
const { uuid } = require("./utils/uuid");
const {
  Server,
  MiniProto,
  ServerCredentials,
  status,
} = require("./protoConfig");

Server.addService(MiniProto.miniproject3.MiniProjectService.service, {
  Download: (call, callback) => {
    const { url } = call.request;

    if (err) {
      callback({
        code: status.NOT_FOUND,
        details: "Not found",
      });
    }

    amqp.connect("amqp://localhost", (error0, { createChannel }) => {
      if (error0) {
        throw error0;
      }
      createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        const npm = "1706075016";
        const id = uuid();
        channel.assertExchange(npm, "topic", { durable: false });

        const publish = {
          json: function (obj) {
            channel.publish(npm, id, Buffer.from(JSON.stringify(...obj)));
          },
        };

        const download = spawn("wget", [url, "-P", "../saved"]);
        let filename;
        download.stderr.on("data", (data) => {
          const str = data.toString();
          if (str.includes("%")) {
            const progress = str.match(/(.*) (.*)%/)[2];
            publish.json(progress);
          } else if (str.includes("saved")) {
            filename = str.match(/‘(.*)’/)[1];
          }
        });
        download.on("close", () => {
          publish.json({ url: "http://localhost:3000/download/" + filename });
        });
        let response = { url, id };
        callback(null, response);
      });
    });
  },
});

Server.bind("0.0.0.0:3123", ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:3123");
Server.start();
