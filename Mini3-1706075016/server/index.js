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
    let response;
    callback(null, response);
  },
});

Server.bind("0.0.0.0:3123", ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:3123");
Server.start();
