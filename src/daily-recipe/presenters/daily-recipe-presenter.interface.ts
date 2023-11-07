import { DailyRecipeDto } from '../dtos/daily-recipe-dto';

export const DAILY_RECIPE_PRESENTER = Symbol('DAILY_RECIPE_PRESENTER');

export interface DailyRecipePresenter {
  present(getDailyRecipeViewModel: DailyRecipeDto): void;

  presentNoDailyRecipe(): void;
}
