import { DailyRecipeDtoViewModel } from '../view-models/daily-recipe-dto-view-model';
import * as assert from 'assert';
import { InternalServerErrorException } from '@nestjs/common';
import { DailyRecipeDtoPresenter } from './daily-recipe-dto-presenter.interface';

export class HttpDailyRecipeDtoPresenter implements DailyRecipeDtoPresenter {
  private getDailyRecipeDtoViewModel: DailyRecipeDtoViewModel | null = null;

  present(getDailyRecipeDtoViewModel: DailyRecipeDtoViewModel): void {
    this.getDailyRecipeDtoViewModel = {
      id: getDailyRecipeDtoViewModel.id,
      recipeId: getDailyRecipeDtoViewModel.recipeId,
      resultMaterialId: getDailyRecipeDtoViewModel.resultMaterialId,
      proposedMaterials: getDailyRecipeDtoViewModel.proposedMaterials,
      date: getDailyRecipeDtoViewModel.date,
    };
  }

  presentNoDailyRecipe(): void {
    throw new InternalServerErrorException('No daily recipe found');
  }

  getViewModel(): DailyRecipeDtoViewModel {
    assert(
      this.getDailyRecipeDtoViewModel !== null,
      'getDailyRecipeDtoViewModel is null',
    );
    return <DailyRecipeDtoViewModel>this.getDailyRecipeDtoViewModel;
  }
}
