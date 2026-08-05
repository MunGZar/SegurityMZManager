import { Usuario } from '@prisma/client';
export interface IAuthRepository {
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: string): Promise<Usuario | null>;
    updateRefreshToken(id: string, hashedToken: string | null): Promise<void>;
}
export declare const IAuthRepository: unique symbol;
