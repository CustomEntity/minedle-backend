import {Nullable} from '../../shared/nullable';
import {Knex} from "knex";
import {Injectable} from "@nestjs/common";
import {Mapper} from "../../shared/mapper";
import {RecipeRepository} from "../ports/recipe-repository.interface";
import {Recipe} from "../entities/recipe";

export const RECIPE_TABLE = 'recipes';

@Injectable()
export class KnexRecipeRepository implements RecipeRepository {

    private readonly mapper: KnexRecipeMapper = new KnexRecipeMapper();

    constructor(private readonly connection: Knex) {
    }

    async findById(id: number): Promise<Nullable<Recipe>> {
        const data = await this.connection(RECIPE_TABLE).where({id}).first();
        return data ? this.mapper.toEntity(data) : null;
    }

    async findMaterialRecipes(materialId: number): Promise<Recipe[]> {
        const recipes = [] as Recipe[];
        const data
            = await this.connection(RECIPE_TABLE).where({result_material_id: materialId});

        for (const recipeData of data) {
            recipes.push(this.mapper.toEntity(recipeData));
        }
        return recipes;
    }

    async findRandomOne(): Promise<Nullable<Recipe>> {
        const data = await this.connection(RECIPE_TABLE).orderByRaw('RANDOM()').first();
        return data ? this.mapper.toEntity(data) : null;
    }
}

export class KnexRecipeMapper extends Mapper<Recipe> {
    toEntity(data: any): Recipe {
        console.log(data);
        return new Recipe({
            id: data.id,
            resultMaterialId: data.result_material_id,
            resultCount: data.result_count,
            inShape: data.in_shape,
            ingredients: data.ingredients,
        });
    }

    toPersistence(entity: Recipe): any {
        return {
            id: entity.id,
            result_material_id: entity.resultMaterialId,
            result_count: entity.resultCount,
            in_shape: entity.inShape,
            ingredients: entity.ingredients,
        };
    }


}