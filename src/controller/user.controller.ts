import {BadRequestException, Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { LoggerService } from '../config/logger.config';
import { validate } from 'class-validator';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user')
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 201, description: 'Created' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly logger: LoggerService,
    ) {}

    @Post('sign-up/')
    @ApiBody({ type: UserDto })
    async signUp(@Body() profileDto: UserDto): Promise<any> {
        const validationResult = await validate(profileDto);
        if (validationResult.length > 0) {
            throw new BadRequestException({
                message: validationResult,
                error: 'Bad Request',
                statusCode: 400,
            });
        }
        const user = await this.userService.create(profileDto);
        return user;
    }

    @Post('sign-in/:email/:password')
    @ApiParam({ name: 'email', required: true })
    @ApiParam({ name: 'password', required: true })
    async signIn(@Param('email') email: string, @Param('password') password: string): Promise<any> {
        const validationResult = await validate({ email, password });
        if (validationResult.length > 0) {
            throw new BadRequestException({
                message: validationResult,
                error: 'Bad Request',
                statusCode: 400,
            });
        }
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Get('get/:email')
    @ApiParam({ name: 'email', required: true })
    async getUser(@Param('email') email: string): Promise<any> {
        const validationResult = await validate({ email });
        if (validationResult.length > 0) {
            throw new BadRequestException({
                message: validationResult,
                error: 'Bad Request',
                statusCode: 400,
            });
        }
        return this.userService.getUser(email);
    }

}
