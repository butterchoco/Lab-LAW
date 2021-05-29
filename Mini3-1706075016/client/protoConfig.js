const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../miniproject3.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const MiniProto = grpc.loadPackageDefinition(packageDefinition).miniproject3;
const MiniProjectService = new MiniProto.MiniProjectService(
  "0.0.0.0:3123",
  grpc.credentials.createInsecure()
);

module.exports = { MiniProjectService };
