const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const faker = require("faker");
const ErrorInvalidRequest = require("../utils/ErrorHandler")
  .ErrorInvalidRequest;

module.exports = async (req, res, _) => {
  const { username, password, client_id, client_secret } = req.body;
  if (!username || !password || !client_id || !client_secret) {
    return ErrorInvalidRequest(res);
  }
  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
      clientId: client_id,
      clientSecret: client_secret,
    },
    include: {
      AccessToken: true,
      RefreshToken: true,
    },
  });
  if (!user) {
    return res.status(401).json({
      error: "invalid_credential",
      error_description: "Data yang dimasukkan tidak ada yang cocok.",
    });
  }
  var startDate = new Date();
  const expiresTill = 300; // In second

  if (user.AccessToken) {
    const expires =
      (user.AccessToken.expiresIn.getTime() - startDate.getTime()) / 1000;
    if (expires > 0) {
      return res.json({
        access_token: user.AccessToken.accessToken,
        expires_in: user.AccessToken.expiresIn,
        token_type: "Bearer",
        scope: null,
        refresh_token: user.RefreshToken.refreshToken,
      });
    }
    await prisma.refreshToken.delete({ where: { id: user.RefreshToken.id } });
    await prisma.accessToken.delete({ where: { id: user.AccessToken.id } });
  }

  const accessToken = faker.random.alphaNumeric(50);
  const refreshToken = faker.random.alphaNumeric(50);
  const expiresIn = new Date(expiresTill * 1000 + startDate.getTime());

  const accessTokenCreation = await prisma.accessToken.create({
    data: {
      accessToken,
      expiresIn,
      userId: user.id,
    },
  });
  const refreshTokenCreation = await prisma.refreshToken.create({
    data: {
      refreshToken,
      expiresIn,
      userId: user.id,
    },
  });

  const userUpdate = await prisma.user.update({
    data: {
      AccessToken: accessTokenCreation,
      RefreshToken: refreshTokenCreation,
    },
    create: {},
  });

  console.log(userUpdate);

  return res.json({
    access_token: accessToken,
    expires_in: expiresIn,
    token_type: "Bearer",
    scope: null,
    refresh_token: refreshToken,
  });
};
