import { Entity } from '../../shared/entity';

export type DailyRecipeData = {
  id: number;
  recipeId: number;
  proposedMaterials: number[];
  date: Date;
};

export class DailyRecipe extends Entity<DailyRecipeData> {
  get id(): number {
    return this.data.id;
  }

  get recipeId(): number {
    return this.data.recipeId;
  }

  get proposedMaterials(): number[] {
    return this.data.proposedMaterials;
  }

  get date(): Date {
    return this.data.date;
  }
}
