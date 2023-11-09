import { Injectable } from '@nestjs/common';
import { Mapper } from '../../shared/mapper';
import { DailyRecipeRepository } from '../ports/daily-recipe-repository.interface';
import { Nullable } from '../../shared/nullable';
import { DailyRecipe } from '../entities/daily-recipe';

export const DAILY_RECIPE_TABLE = 'daily_recipe';

@Injectable()
export class KnexDailyRecipeRepository implements DailyRecipeRepository {
  private readonly mapper: KnexDailyRecipeMapper = new KnexDailyRecipeMapper();

  constructor(private readonly connection: any) {}

  async findByDate(date: Date): Promise<Nullable<DailyRecipe>> {
    const data = await this.connection(DAILY_RECIPE_TABLE)
      .select('*')
      .where('date', date.toISOString())
      .first();

    if (!data) {
      return null;
    }
    return this.mapper.toEntity(data);
  }

  async save(dailyRecipe: any): Promise<void> {
    await this.connection(DAILY_RECIPE_TABLE).insert(
      this.mapper.toPersistence(dailyRecipe),
    );

    return Promise.resolve();
  }
}

export class KnexDailyRecipeMapper extends Mapper<DailyRecipe> {
  toEntity(data: any): DailyRecipe {
    return new DailyRecipe({
      id: data.id,
      recipeId: data.recipe_id,
      proposedMaterials: data.proposed_materials,
      date: data.date,
    });
  }

  toPersistence(entity: DailyRecipe): any {}
}
