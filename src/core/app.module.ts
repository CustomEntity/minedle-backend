import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileHashesModule } from '../file-hashes/file-hashes.module';
import {ConfigModule} from "@nestjs/config";
import configuration from "./config/configuration";
import {MaterialsModule} from "../materials/materials.module";
import {RecipesModule} from "../recipes/recipes.module";

@Module({
  imports: [FileHashesModule,
      MaterialsModule,
      RecipesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
