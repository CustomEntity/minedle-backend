import { DailyRecipe } from '../entities/daily-recipe';
import { Nullable } from '../../shared/nullable';

export const DAILY_RECIPE_REPOSITORY = Symbol('DAILY_RECIPE_REPOSITORY');

export interface DailyRecipeRepository {
  save(dailyRecipe: DailyRecipe): Promise<void>;

  findByDate(date: Date): Promise<Nullable<DailyRecipe>>;
}
