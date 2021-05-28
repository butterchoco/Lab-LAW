const PROTO_PATH = "./miniproject3.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const Server = new grpc.Server();
const MiniProto = grpc.loadPackageDefinition(packageDefinition);

module.exports = {
  Server,
  MiniProto,
  ServerCredential: grpc.ServerCredential,
  status: grpc.status,
};
