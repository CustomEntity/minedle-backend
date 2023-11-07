export type DailyRecipeViewModel = {
  id: number;
  recipeId: number;
  proposedMaterials: { id: number; name: string }[];
  date: Date;
};
