-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "npm" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.nama_unique" ON "User"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "User.npm_unique" ON "User"("npm");
