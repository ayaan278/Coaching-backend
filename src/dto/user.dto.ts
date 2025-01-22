import { IsString, IsOptional, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'The name of the user',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'The phone number of the user',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        description: 'The status of the user account',
        type: String,
        required: false,
        default: 'active',
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({
        description: 'The date the user was created',
        type: String,
        required: false,
        default: new Date().toISOString(),
    })
    @IsOptional()
    @IsDateString()
    createdAt?: Date;

    @ApiProperty({
        description: 'The date the user was last updated',
        type: String,
        required: false,
        default: new Date().toISOString(),
    })
    @IsOptional()
    @IsDateString()
    updatedAt?: Date;

    @ApiProperty({
        description: 'The role of the user',
        type: String,
        required: false,
        default: 'user',
    })
    @IsOptional()
    @IsString()
    role?: string = 'user';
}
