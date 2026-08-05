import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
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
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') || 'fallback_refresh_key_54321',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Refresh Token inválido o expirado');
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
      throw new UnauthorizedException('Refresh Token ausente');
    }

    return { id: payload.sub, refreshToken };
  }
}
