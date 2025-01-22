import {IsString, IsOptional, IsNotEmpty, IsEmail, IsDateString, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ClientDto {
    @ApiProperty({
        description: 'The coach id of the session',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    coachId: string;

    @ApiProperty({
        description: 'The user id of the session',
        type: String,
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'The status of the session',
        type: String,
        required: false,
        default: 'active',
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({
        description: 'The date the session was created',
        type: String,
        required: false,
        default: new Date().toISOString(),
    })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({
        description: 'The date the session was ended',
        type: String,
        required: false,
        default: new Date().toISOString(),
    })
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}
