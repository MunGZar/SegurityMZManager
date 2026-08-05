import { PrismaService } from '../../../../prisma/prisma.service';
import { IAuthRepository } from '../../domain/auth.repository.interface';
import { Usuario } from '@prisma/client';
export declare class PrismaAuthRepository implements IAuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: string): Promise<Usuario | null>;
    updateRefreshToken(id: string, hashedToken: string | null): Promise<void>;
}
