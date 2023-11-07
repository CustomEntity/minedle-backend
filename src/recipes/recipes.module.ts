import { Module } from '@nestjs/common';
import { KnexModule } from '../core/adapters/knex/knex.module';
import { RECIPE_REPOSITORY } from './ports/recipe-repository.interface';
import { KnexService } from '../core/adapters/knex/knex.service';
import { KnexRecipeRepository } from './adapters/knex-recipe-repository';

@Module({
  imports: [KnexModule],
  providers: [
    {
      provide: RECIPE_REPOSITORY,
      useFactory: (knexService: KnexService) => {
        return new KnexRecipeRepository(knexService.connection);
      },
      inject: [KnexService],
    },
  ],
  exports: [RECIPE_REPOSITORY],
})
export class RecipesModule {}
