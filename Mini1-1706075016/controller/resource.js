const PrismaClient = require("@prisma/client").PrismaClient;
const ErrorInvalidRequest = require("../utils/ErrorHandler")
  .ErrorInvalidRequest;

module.exports = (req, res, _) => {
  return res.json({
    client_id: "7162",
    user_id: "unicorn",
    full_name: "Budi Anduk",
    npm: "1406123456",
    refresh_token: "a5a4a1d029f2aae5786d8c1ef9ac7a01a2524941",
    access_token: "d8c1ef9ac7a01a2524941a1d029f2aae5786",
    expires: null,
  });
};
