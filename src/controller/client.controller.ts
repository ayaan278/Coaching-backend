import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiParam, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/auth-guard.jwt';
import {SessionService} from "../service/session.service";
import {ClientService} from "../service/client.service";
import {ClientDto} from "../dto/client.dto";


@ApiBearerAuth('jwt')
@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService,
    ){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'The client has been successfully created'})
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async create(@Body() clientDto: ClientDto) {
        return this.clientService.createClient(clientDto);
    }

    @Get('get/:id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'The client details'})
    @ApiResponse({ status: 404, description: 'Client not found' })
    async findOne(@Param('id') id: string) {
        return this.clientService.findClient(id);
    }

    @Get('get/:clientId')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'The Client for the user' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async findClient(@Param('clientId') clientId: string) {
        return this.clientService.findClient(clientId);
    }

    @Put('/update/session-status')
    @UseGuards(JwtAuthGuard)
    async updateSessionStatusByClient(){
        // use token by client to update session status
    }


}
