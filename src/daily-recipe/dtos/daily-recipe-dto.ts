export type DailyRecipeDto = {
  id: number;
  recipeId: number;
  proposedMaterials: { id: number; name: string, displayName: string, textureUrl: string }[];
  date: Date;
};
