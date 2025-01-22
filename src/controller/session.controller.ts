import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {ApiTags, ApiParam, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/auth-guard.jwt';
import {SessionService} from "../service/session.service";
import {Session} from "../schema/session.schema";

@ApiBearerAuth('jwt')
@ApiTags('session')
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Get('get/:id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'The session details', type: Session})
    @ApiResponse({ status: 404, description: 'Session not found' })
    async findOne(@Param('id') id: string): Promise<Session> {
        return this.sessionService.findSession(id);
    }

    @Get('get/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'The session for the user', type: Session })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async findUserSession(@Param('userId') userId: string,
                          @Param('coachId') coachId: string,
    ): Promise<Session[]> {
        return this.sessionService.findSessionByUser(userId);
    }
}
