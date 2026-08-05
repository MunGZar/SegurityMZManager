"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_repository_interface_1 = require("../domain/auth.repository.interface");
const prisma_auth_repository_1 = require("./repositories/prisma-auth.repository");
const login_use_case_1 = require("../application/use-cases/login.use-case");
const logout_use_case_1 = require("../application/use-cases/logout.use-case");
const refresh_token_use_case_1 = require("../application/use-cases/refresh-token.use-case");
const jwt_strategy_1 = require("../application/strategies/jwt.strategy");
const jwt_refresh_strategy_1 = require("../application/strategies/jwt-refresh.strategy");
const prisma_module_1 = require("../../../prisma/prisma.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_ACCESS_SECRET'),
                    signOptions: { expiresIn: '15m' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            login_use_case_1.LoginUseCase,
            logout_use_case_1.LogoutUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            {
                provide: auth_repository_interface_1.IAuthRepository,
                useClass: prisma_auth_repository_1.PrismaAuthRepository,
            },
        ],
        exports: [
            login_use_case_1.LoginUseCase,
            logout_use_case_1.LogoutUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map