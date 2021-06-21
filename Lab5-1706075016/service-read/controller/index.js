const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const { npm } = req.params;

  if (npm) {
    const user = await prisma.user.findUnique({
      where: {
        npm,
      },
    });
    console.log(user);
    return res.json(user);
  } else {
    return res.send("Hello");
  }
};
