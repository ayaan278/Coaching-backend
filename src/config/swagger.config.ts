import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export function setupSwagger(app) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const config = new DocumentBuilder()
        .setTitle('Kahunas IO Coaching Test Backend')
        .setDescription('The backend for the Kahunas IO Coaching System, a system ' +
            'with all-in-one coaching platform that gives users their ' +
            'own branded coaching app in the app stores.')
        .setVersion(packageJson.version)
        .addBearerAuth(
            {
                description: 'Default JWT Authorization',
                name: 'Authorization',
                type: 'http',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'jwt',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
