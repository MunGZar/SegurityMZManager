import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../domain/auth.repository.interface';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.authRepository.updateRefreshToken(userId, null);
  }
}
