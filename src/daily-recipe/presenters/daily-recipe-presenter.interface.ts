import {DailyRecipe} from "../entities/daily-recipe";

export const DAILY_RECIPE_PRESENTER = Symbol('DAILY_RECIPE_PRESENTER');

export interface DailyRecipePresenter {
  present(getDailyRecipeViewModel: DailyRecipe): void;

  presentNoDailyRecipe(): void;
}
