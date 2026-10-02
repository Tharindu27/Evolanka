-- CreateTable
CREATE TABLE "Tourist" (
    "touristId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "passportNumber" TEXT,
    "nic" TEXT,
    "password" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tourist_pkey" PRIMARY KEY ("touristId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tourist_email_key" ON "Tourist"("email");
