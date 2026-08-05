import type { Response, Request } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly logoutUseCase;
    private readonly refreshTokenUseCase;
    constructor(loginUseCase: LoginUseCase, logoutUseCase: LogoutUseCase, refreshTokenUseCase: RefreshTokenUseCase);
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            nombre: string;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    getMe(req: Request): Promise<Express.User | undefined>;
}
