import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalForPrisma.prisma) {
    try {
      globalForPrisma.prisma = new PrismaClient({
        log: ['error'],
      });
    } catch {
      console.error('[MusaTech API] Erreur initialisation PrismaClient.');
      return null;
    }
  }

  return globalForPrisma.prisma;
}

