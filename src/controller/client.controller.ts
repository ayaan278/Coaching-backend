import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiParam, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/auth-guard.jwt';
import {ClientService} from "../service/client.service";
import {ClientDto} from "../dto/client.dto";
import {SessionStatus} from "../enum/session-status.enum";


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


    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'The client has been successfully updated' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async update(@Param('id') id: string, @Body() clientDto: ClientDto) {
        return this.clientService.updateClient(id, clientDto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'The client has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async delete(@Param('id') id: string) {
        return this.clientService.deleteClient(id);
    }


    @Put('/update/session-status-by-client')
    @ApiParam({ name: 'token', type: String, required: true })
    @ApiParam({ name: 'status', enum: SessionStatus, required: true })
    @ApiResponse({ status: 200, description: 'The session status has been successfully updated' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async updateSessionStatusByClientUsingToken(
        @Param('token') token: string,
        @Param('status') status: SessionStatus
    ){
        return this.clientService.updateSessionStatusByClientUsingToken(token, status);
    }

}
