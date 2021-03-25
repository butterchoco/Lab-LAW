const express = require("express");
const router = express.Router();

const ErrorInvalidRequest = require("../utils/errorHandler")
  .ErrorInvalidRequest;
const ErrorInvalidToken = require("../utils/errorHandler").ErrorInvalidToken;

router.post("/resource", (req, res, _) => {
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
  return res.json({
    client_id: "7162",
    user_id: "unicorn",
    full_name: "Budi Anduk",
    npm: "1406123456",
    refresh_token: "a5a4a1d029f2aae5786d8c1ef9ac7a01a2524941",
    access_token: "d8c1ef9ac7a01a2524941a1d029f2aae5786",
    expires: null,
  });
});

router.post("/token", (req, res, _) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.password ||
    !req.body.client_id ||
    !req.body.client_secret
  ) {
    return ErrorInvalidRequest(res);
  }
  return res.json({
    access_token: "[40 karakter token]",
    expires_in: 300,
    token_type: "Bearer",
    scope: null,
    refresh_token: "[40 karakter token]",
  });
});

module.exports = router;
