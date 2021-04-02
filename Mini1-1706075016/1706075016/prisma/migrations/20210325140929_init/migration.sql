-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" DATETIME NOT NULL,
    "userId" TEXT,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" DATETIME NOT NULL,
    "userId" TEXT,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "scope" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_unique" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_userId_unique" ON "AccessToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.clientId_unique" ON "User"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "User.clientSecret_unique" ON "User"("clientSecret");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
