CREATE DATABASE stock;

\c stock;

CREATE TABLE IF NOT EXISTS "Vehicles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vin" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "odometer" DOUBLE PRECISION NOT NULL,
    "odometerUnit" TEXT NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Vehicles_vin_key" ON "Vehicles"("vin");
