-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LocationSubmitter" AS ENUM ('TOURIST', 'PROVIDER', 'ADMIN');

-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT,
    "district" TEXT,
    "nearestTown" TEXT,
    "categories" TEXT[],
    "description" TEXT,
    "highlights" TEXT[],
    "bestTime" TEXT,
    "openingDays" TEXT,
    "freeEntry" BOOLEAN NOT NULL DEFAULT false,
    "localAdultPrice" TEXT,
    "localChildPrice" TEXT,
    "foreignAdultPrice" TEXT,
    "foreignChildPrice" TEXT,
    "ticketNote" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "travelTips" TEXT[],
    "status" "LocationStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "submitterType" "LocationSubmitter" NOT NULL,
    "submitterName" TEXT NOT NULL,
    "touristId" INTEGER,
    "providerId" INTEGER,
    "adminId" INTEGER,
    "reviewedById" INTEGER,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "LocationPhoto" (
    "photoId" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationPhoto_pkey" PRIMARY KEY ("photoId")
);

-- CreateIndex
CREATE INDEX "Location_status_idx" ON "Location"("status");

-- CreateIndex
CREATE INDEX "Location_touristId_idx" ON "Location"("touristId");

-- CreateIndex
CREATE INDEX "Location_providerId_idx" ON "Location"("providerId");

-- CreateIndex
CREATE INDEX "LocationPhoto_locationId_idx" ON "LocationPhoto"("locationId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "Tourist"("touristId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("providerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationPhoto" ADD CONSTRAINT "LocationPhoto_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE CASCADE ON UPDATE CASCADE;
