import {Module} from '@nestjs/common';
import { LoggerService } from './config/logger.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { StrategyJwt } from './jwt/strategy.jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import {Client, ClientSchema} from "./schema/client.schema";
import {Session, SessionSchema} from "./schema/session.schema";
import {SessionService} from './service/session.service';
import {SessionController} from "./controller/session.controller";
import {ClientService} from "./service/client.service";
import {ClientController} from "./controller/client.controller";



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                'env/.env.dev'
            ],
            ignoreEnvFile: false,
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `${configService.get<string>('MONGODB_URI')}${configService.get<string>('MONGODB_COACHING')}`,
            }),
            inject: [ConfigService],
            connectionName: 'Coaching',
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Client.name, schema: ClientSchema },
            { name: Session.name, schema: SessionSchema}
        ], 'Coaching'),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'coachingsupersecretkey',
            signOptions: { expiresIn: '1h' }, // Set token expiration time
        }),
        PassportModule,
    ],
    controllers: [
        UserController,
        ClientController,
        SessionController
    ],
    providers: [
        StrategyJwt,
        LoggerService,
        UserService,
        AuthService,
        ClientService,
        SessionService
    ],
})
export class AppModule {}
