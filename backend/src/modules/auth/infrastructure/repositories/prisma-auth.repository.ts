import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IAuthRepository } from '../../domain/auth.repository.interface';
import { Usuario } from '@prisma/client';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async updateRefreshToken(id: string, hashedToken: string | null): Promise<void> {
    await this.prisma.usuario.update({
      where: { id },
      data: { refreshToken: hashedToken },
    });
  }
}
