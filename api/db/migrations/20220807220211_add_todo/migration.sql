-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
