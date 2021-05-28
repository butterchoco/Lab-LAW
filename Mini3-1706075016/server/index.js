const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const {
  Server,
  MiniProto,
  ServerCredentials,
  status,
} = require("./protoConfig");

Server.addService(MiniProto.MiniProjectService.service, {
  get: (call, callback) => {
    const { url } = call.request;

    if (err) {
      callback({
        code: status.NOT_FOUND,
        details: "Not found",
      });
    }
    const download = spawn("wget", [url, "-O", `${uuidv4}.`]);
    download.stderr.on("data", (data) => {
      const str = data.toString();
      if (str.includes("%")) {
        const progress = str.match(/ (.*)%/)[0];
        console.log(progress);
      } else if (str.includes("saved")) {
        const filename = str.match(/‘(.*)’/)[1];
        console.log(filename);
      }
    });
    download.on("close", () => {
      let response = { url, id };
      callback(null, response);
    });
  },
});

Server.bind("0.0.0.0:3123", ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:3123");
Server.start();
