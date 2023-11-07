import { DailyRecipePresenter } from './daily-recipe-presenter.interface';
import { DailyRecipeViewModel } from '../view-models/daily-recipe-view-model';
import * as assert from 'assert';
import {InternalServerErrorException} from "@nestjs/common";

export class HttpDailyRecipePresenter implements DailyRecipePresenter {
  private getDailyRecipeViewModel: DailyRecipeViewModel | null = null;

  present(getDailyRecipeViewModel: DailyRecipeViewModel): void {
    this.getDailyRecipeViewModel = {
      id: getDailyRecipeViewModel.id,
      recipeId: getDailyRecipeViewModel.recipeId,
      proposedMaterials: getDailyRecipeViewModel.proposedMaterials,
      date: getDailyRecipeViewModel.date,
    };
  }

  presentNoDailyRecipe(): void {
    throw new InternalServerErrorException('No daily recipe found');
  }

  getViewModel(): DailyRecipeViewModel {
    assert(
      this.getDailyRecipeViewModel !== null,
      'getDailyRecipeViewModel is null',
    );
    return <DailyRecipeViewModel>this.getDailyRecipeViewModel;
  }
}
