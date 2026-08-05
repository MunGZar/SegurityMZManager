import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../domain/auth.repository.interface';
import { LoginDto } from '../dtos/login.dto';
export declare class LoginUseCase {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: IAuthRepository, jwtService: JwtService, configService: ConfigService);
    execute(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            nombre: string;
        };
    }>;
}
