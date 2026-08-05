import { IAuthRepository } from '../../domain/auth.repository.interface';
export declare class LogoutUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(userId: string): Promise<void>;
}
