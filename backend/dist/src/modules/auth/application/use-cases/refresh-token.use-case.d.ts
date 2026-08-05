import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../domain/auth.repository.interface';
export declare class RefreshTokenUseCase {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: IAuthRepository, jwtService: JwtService, configService: ConfigService);
    execute(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
