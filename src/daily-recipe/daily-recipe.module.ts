import { Module } from '@nestjs/common';
import { KnexModule } from '../core/adapters/knex/knex.module';
import { DailyRecipeController } from './controllers/daily-recipe.controller';
import { DAILY_RECIPE_DTO_PRESENTER } from './presenters/daily-recipe-dto-presenter.interface';
import { HttpDailyRecipeDtoPresenter } from './presenters/http-daily-recipe-dto-presenter';
import { DAILY_RECIPE_REPOSITORY } from './ports/daily-recipe-repository.interface';
import { KnexService } from '../core/adapters/knex/knex.service';
import { GetDailyRecipeUseCase } from './usecases/get-daily-recipe-use-case';
import { SystemModule } from '../system/system.module';
import { CurrentDateProvider } from '../system/date/current-date-provider';
import { KnexDailyRecipeRepository } from './adapters/knex-daily-recipe-repository';
import { DATE_PROVIDER } from '../system/date/date-provider.interface';

@Module({
  imports: [SystemModule, KnexModule],
  controllers: [DailyRecipeController],
  providers: [
    {
      provide: DAILY_RECIPE_REPOSITORY,
      useFactory: (knexService: KnexService) => {
        return new KnexDailyRecipeRepository(knexService.connection);
      },
      inject: [KnexService],
    },
    {
      provide: DAILY_RECIPE_DTO_PRESENTER,
      useClass: HttpDailyRecipeDtoPresenter,
    },
    {
      provide: GetDailyRecipeUseCase,
      useFactory: (
        dateProvider: CurrentDateProvider,
        dailyRecipeRepository: KnexDailyRecipeRepository,
        dailyRecipePresenter: HttpDailyRecipeDtoPresenter,
      ) => {
        return new GetDailyRecipeUseCase(
          dateProvider,
          dailyRecipeRepository,
          dailyRecipePresenter,
        );
      },
      inject: [
        DATE_PROVIDER,
        DAILY_RECIPE_REPOSITORY,
        DAILY_RECIPE_DTO_PRESENTER,
      ],
    },
  ],
  exports: [
    DAILY_RECIPE_REPOSITORY,
    DAILY_RECIPE_DTO_PRESENTER,
    GetDailyRecipeUseCase,
  ],
})
export class DailyRecipeModule {}
