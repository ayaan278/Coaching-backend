import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {ApiTags, ApiParam, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/auth-guard.jwt';
import {SessionService} from "../service/session.service";


@ApiBearerAuth('jwt')
@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(private readonly sessionService: SessionService) {}


}
