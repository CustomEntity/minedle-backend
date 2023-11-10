import { DailyRecipeData } from '../entities/daily-recipe';

export type DailyRecipeDto = DailyRecipeData & {
  resultMaterialId: number;
};
