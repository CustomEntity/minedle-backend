import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileHashesModule } from '../file-hashes/file-hashes.module';
import {ConfigModule} from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [FileHashesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
