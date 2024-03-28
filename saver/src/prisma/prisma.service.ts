// prisma.service.ts
import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get client() {
    return this.prisma;
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
