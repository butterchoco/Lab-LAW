const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const { nama, npm } = req.body;

  if (nama && npm) {
    const user = await prisma.user.create({
      data: {
        nama,
        npm,
      },
    });
    res.json(user);
  } else {
    res.status(400);
    return res.json({
      error: "invalid_request",
      error_description: "ada kesalahan masbro!",
    });
  }
};
