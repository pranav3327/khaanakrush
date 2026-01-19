const { PrismaClient } = require('@prisma/client');

let prisma;

function getPrisma() {
  if (!prisma) {
    // Prisma v7 requires a driver adapter at runtime.
    // Keep this helper for later, but do not initialize by default.
    prisma = new PrismaClient({});
  }
  return prisma;
}

module.exports = { getPrisma };

