import {Entity} from "../../shared/entity";

export type RecipeData = {
    id: number;
    resultMaterialId: number;
    resultCount: number;
    inShape: (number | null)[][];
    ingredients: number[];
}

export class Recipe extends Entity<RecipeData> {
    get id(): number {
        return this.data.id;
    }

    get resultMaterialId(): number {
        return this.data.resultMaterialId;
    }

    get resultCount(): number {
        return this.data.resultCount;
    }

    get inShape(): (number | null)[][] {
        return this.data.inShape;
    }

    get ingredients(): number[] {
        return this.data.ingredients;
    }
}