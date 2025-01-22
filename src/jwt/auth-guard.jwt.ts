import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            // Verify token
            const payload = this.jwtService.verify(token);
            request.user = payload; // Attach payload to request object
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
