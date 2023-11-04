import { Nullable } from '../../shared/nullable';
import {Recipe} from "../entities/recipe";

export const RECIPE_REPOSITORY = Symbol('RECIPE_REPOSITORY');

export interface RecipeRepository {
  findById(id: number): Promise<Nullable<Recipe>>;

  findMaterialRecipes(materialId: number): Promise<Recipe[]>;

  findRandomOne(): Promise<Nullable<Recipe>>;
}
