import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './core/app.module';
import {ConfigService} from "@nestjs/config";

let server: { close: (arg0: (err: any) => void) => void };

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173'];
      const domainRegex = /^[a-z]+:\/\/(?:[^\/]*\.+)*minedle\.eu/;
      const ngrokRegex = /^[a-z]+:\/\/(?:[^\/]*\.+)*ngrok-free\.app/;
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        domainRegex.test(origin) ||
        ngrokRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  server = await app.listen(port, '0.0.0.0');
}

bootstrap();
