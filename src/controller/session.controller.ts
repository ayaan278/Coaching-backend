import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {ApiTags, ApiParam, ApiResponse, ApiBearerAuth, ApiQuery} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/auth-guard.jwt';
import {SessionService} from "../service/session.service";
import {Session} from "../schema/session.schema";
import {SessionStatus} from "../enum/session-status.enum";

@ApiBearerAuth('jwt')
@ApiTags('session')
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Get('get/:id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'The session details', type: Session })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async findSession(@Param('id') id: string): Promise<Session> {
        return this.sessionService.findSession(id);
    }

    @Get('get-by-client/:clientId')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'clientId', type: String })
    @ApiQuery({ name: 'status', enum: SessionStatus, required: false })
    @ApiResponse({ status: 200, description: 'The session for the client', type: Session })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async findSessionByClient(@Param('clientId') clientId: string, @Query('status') status?: SessionStatus): Promise<Session[]> {
        return this.sessionService.findSessionByClientIdAndService(clientId, status);
    }

    @Get('get-by-coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'coachId', type: String })
    @ApiQuery({ name: 'status', enum: SessionStatus, required: false })
    @ApiResponse({ status: 200, description: 'The session for the coach', type: Session })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async findSessionByCoach(@Param('coachId') coachId: string, @Query('status') status?: SessionStatus): Promise<Session[]> {
        return this.sessionService.findSessionByCoachAndStatus(coachId, status);
    }

}
