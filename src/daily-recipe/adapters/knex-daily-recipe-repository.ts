import { Injectable } from '@nestjs/common';
import { Mapper } from '../../shared/mapper';
import { DailyRecipeDto } from '../dtos/daily-recipe-dto';
import { DailyRecipeRepository } from '../ports/daily-recipe-repository.interface';
import { Nullable } from '../../shared/nullable';

export const DAILY_RECIPE_TABLE = 'daily_recipe';

@Injectable()
export class KnexDailyRecipeRepository implements DailyRecipeRepository {
  private readonly mapper: KnexDailyRecipeMapper = new KnexDailyRecipeMapper();

  constructor(private readonly connection: any) {}

  async findByDate(date: Date): Promise<Nullable<DailyRecipeDto>> {
    const expandedQuery = `
  WITH expanded AS (
      SELECT daily_recipe.id as id,
             daily_recipe.recipe_id as recipe_id,
             daily_recipe.date,
             unnest(proposed_materials) as proposed_material
      FROM daily_recipe
      WHERE daily_recipe.date = '${date.toISOString()}'
  )
  SELECT expanded.id,
         expanded.recipe_id,
         expanded.date,
         materials.id as material_id,
         materials.name as material_name,
         materials.display_name as material_display_name,
         materials.texture_url as material_texture_url
  FROM expanded
  JOIN materials ON expanded.proposed_material = materials.id
`;
    const data = await this.connection.raw(expandedQuery);

    if (!data || !data.rows || data.rows.length === 0) {
      return null;
    }
    return this.mapper.toEntity(data.rows);
  }

  async save(dailyRecipe: any): Promise<void> {
    await this.connection(DAILY_RECIPE_TABLE).insert(
      this.mapper.toPersistence(dailyRecipe),
    );

    return Promise.resolve();
  }
}

export class KnexDailyRecipeMapper extends Mapper<DailyRecipeDto> {
  toEntity(data: any): DailyRecipeDto {
    return {
      id: data[0].id,
      recipeId: data[0].recipe_id,
      proposedMaterials: data.map((material: any) => {
          return {
              id: material.material_id,
              name: material.material_name,
              display_name: material.material_display_name,
              texture_url: material.material_texture_url
          }
      }),
      date: data[0].date,
    };
  }

  toPersistence(entity: DailyRecipeDto): any {}
}
