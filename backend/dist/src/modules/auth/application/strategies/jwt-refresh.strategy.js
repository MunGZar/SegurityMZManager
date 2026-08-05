"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => {
                    let token = null;
                    if (req && req.cookies) {
                        token = req.cookies['refreshToken'];
                    }
                    if (!token && req && req.headers.cookie) {
                        const rawCookies = req.headers.cookie.split(';');
                        const refreshCookie = rawCookies.find(c => c.trim().startsWith('refreshToken='));
                        if (refreshCookie) {
                            token = refreshCookie.split('=')[1];
                        }
                    }
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'fallback_refresh_key_54321',
            passReqToCallback: true,
        });
    }
    async validate(req, payload) {
        if (!payload || !payload.sub) {
            throw new common_1.UnauthorizedException('Refresh Token inválido o expirado');
        }
        let refreshToken = null;
        if (req && req.cookies) {
            refreshToken = req.cookies['refreshToken'];
        }
        if (!refreshToken && req && req.headers.cookie) {
            const rawCookies = req.headers.cookie.split(';');
            const refreshCookie = rawCookies.find(c => c.trim().startsWith('refreshToken='));
            if (refreshCookie) {
                refreshToken = refreshCookie.split('=')[1];
            }
        }
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh Token ausente');
        }
        return { id: payload.sub, refreshToken };
    }
};
exports.JwtRefreshStrategy = JwtRefreshStrategy;
exports.JwtRefreshStrategy = JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtRefreshStrategy);
//# sourceMappingURL=jwt-refresh.strategy.js.map