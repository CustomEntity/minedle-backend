import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Res,
} from '@nestjs/common';
import { GetDailyRecipeUseCase } from '../usecases/get-daily-recipe-use-case';
import { DAILY_RECIPE_PRESENTER } from '../presenters/daily-recipe-presenter.interface';
import { HttpDailyRecipePresenter } from '../presenters/http-daily-recipe-presenter';
import { FastifyReply } from 'fastify';

@Controller('daily-recipe')
export class DailyRecipeController {
  constructor(
    private getDailyRecipeUseCase: GetDailyRecipeUseCase,
    @Inject(DAILY_RECIPE_PRESENTER)
    private dailyRecipePresenter: HttpDailyRecipePresenter,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDailyRecipe(@Res() response: FastifyReply) {
    await this.getDailyRecipeUseCase.execute(void 0);

    response.send(this.dailyRecipePresenter.getViewModel());
  }
}
