-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bussName" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    CONSTRAINT "Customer_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emplyName" TEXT NOT NULL,
    "isSalary" BOOLEAN NOT NULL,
    "payRate" DECIMAL NOT NULL,
    "emplyrId" INTEGER NOT NULL,
    CONSTRAINT "Employee_emplyrId_fkey" FOREIGN KEY ("emplyrId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Payroll_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PayRow" (
    "periodStart" DATETIME NOT NULL,
    "periodEnd" DATETIME NOT NULL,
    "units" INTEGER NOT NULL,
    "currIsSalary" BOOLEAN NOT NULL,
    "currRate" DECIMAL NOT NULL,
    "payrollId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    PRIMARY KEY ("payrollId", "employeeId"),
    CONSTRAINT "PayRow_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PayRow_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_bussName_key" ON "Customer"("bussName");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userUid_key" ON "Customer"("userUid");
