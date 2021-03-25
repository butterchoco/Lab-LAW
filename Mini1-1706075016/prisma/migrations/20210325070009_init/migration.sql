-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "expiresIn" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "expiresIn" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "scope" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken.userId_unique" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken.userId_unique" ON "AccessToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.clientId_unique" ON "User"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "User.clientSecret_unique" ON "User"("clientSecret");
