import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
    },
    colors: {
        error: 'red',
        debug: 'magenta',
        warn: 'yellow',
        data: 'cyan',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
    }
};

winston.addColors(config.colors);

@Injectable()
export class LoggerService {
    private logger: winston.Logger;


    constructor() {
        this.logger = winston.createLogger({
            levels: config.levels,
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.colorize({ all: true }),
            ),
            transports: [
                new winston.transports.Console(),

            ],
        });
    }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    http(message: string, context?: string) {
        this.logger.http(message, { context });
    }

    message(message: string, object: any) {
        this.logger.data(message, { object });
        this.logger.format = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.cli(),
        );
    }

    logWithString(message: string, string: string) {
        this.logger.data(`${message} ${string}`);
        this.logger.format = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.cli(),
        );
    }

    errorWithObject(message: string, object: any, trace: string, context?: string) {
        this.logger.error(message, { object, trace, context });
    }



}
