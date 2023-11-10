import { DailyRecipeDto } from '../dto/daily-recipe-dto';

export const DAILY_RECIPE_DTO_PRESENTER = Symbol('DAILY_RECIPE_DTO_PRESENTER');

export interface DailyRecipeDtoPresenter {
  present(getDailyRecipeDtoViewModel: DailyRecipeDto): void;

  presentNoDailyRecipe(): void;
}
