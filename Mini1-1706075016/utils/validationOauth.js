const PrismaClient = require("@prisma/client").PrismaClient;

const ErrorInvalidRequest = require("./ErrorHandler").ErrorInvalidRequest;
const ErrorInvalidToken = require("./ErrorHandler").ErrorInvalidToken;

const validate = (cb) => {
  return function (req, res, next) {
    const authHeader = req.header("Authorization");
    console.log(authHeader);
    if (!authHeader) {
      return ErrorInvalidRequest(res);
    }
    const headTemp = authHeader.split(" ");
    const tokenType = headTemp[0];
    const token = headTemp[1];
    if (tokenType !== "Bearer" || token !== "test") {
      return ErrorInvalidToken(res);
    }

    cb(req, res, next);
  };
};

module.exports = validate;
