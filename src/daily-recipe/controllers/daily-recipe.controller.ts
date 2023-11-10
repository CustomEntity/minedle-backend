import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Res,
} from '@nestjs/common';
import { GetDailyRecipeUseCase } from '../usecases/get-daily-recipe-use-case';
import { HttpDailyRecipeDtoPresenter } from '../presenters/http-daily-recipe-dto-presenter';
import { FastifyReply } from 'fastify';
import {DAILY_RECIPE_DTO_PRESENTER} from "../presenters/daily-recipe-dto-presenter.interface";

@Controller('daily-recipe')
export class DailyRecipeController {
  constructor(
    private getDailyRecipeUseCase: GetDailyRecipeUseCase,
    @Inject(DAILY_RECIPE_DTO_PRESENTER)
    private dailyRecipePresenter: HttpDailyRecipeDtoPresenter,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDailyRecipe(@Res() response: FastifyReply) {
    await this.getDailyRecipeUseCase.execute(void 0);

    response.send(this.dailyRecipePresenter.getViewModel());
  }
}
