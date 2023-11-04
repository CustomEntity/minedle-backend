import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {FileHashesModule} from "../file-hashes/file-hashes.module";

@Module({
  imports: [
      FileHashesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
