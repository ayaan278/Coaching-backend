import {IsString, IsOptional, IsNotEmpty, IsEmail, IsDateString, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ClientDto {
    @ApiProperty({ description: 'The name of the user', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The email of the user', required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The coach id of the session', required: true })
    @IsString()
    @IsNotEmpty()
    coachId: string;

    @ApiProperty({ description: 'The status of the client', required: false, default: 'active' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ description: 'The date the client was created', required: false, default: new Date().toISOString() })
    @IsOptional()
    @IsDateString()
    date?: string;  // changed to string for better type handling
}

