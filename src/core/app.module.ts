import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileHashesModule } from '../file-hashes/file-hashes.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MaterialsModule } from '../materials/materials.module';
import { RecipesModule } from '../recipes/recipes.module';
import { DailyRecipeModule } from '../daily-recipe/daily-recipe.module';
import { AppService } from './app.service';

@Module({
  imports: [
    FileHashesModule,
    MaterialsModule,
    RecipesModule,
    DailyRecipeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
