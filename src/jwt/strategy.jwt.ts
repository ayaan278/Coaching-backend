import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../service/user.service';

@Injectable()
export class StrategyJwt extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'), // Get secret from ConfigService
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
