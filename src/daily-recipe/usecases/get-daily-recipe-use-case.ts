import { UseCase } from '../../shared/usecase';
import { DailyRecipeRepository } from '../ports/daily-recipe-repository.interface';
import { DailyRecipePresenter } from '../presenters/daily-recipe-presenter.interface';
import { DateProvider } from '../../system/date/date-provider.interface';

export type Request = void;

export class GetDailyRecipeUseCase extends UseCase<Request> {
  constructor(
    private readonly dateProvider: DateProvider,
    private readonly dailyRecipeRepository: DailyRecipeRepository,
    private readonly dailyRecipePresenter: DailyRecipePresenter,
  ) {
    super();
  }

  async handle(unused: Request): Promise<void> {
    const dailyRecipe = await this.dailyRecipeRepository.findByDate(
      this.dateProvider.getDate(),
    );

    if (dailyRecipe === null) {
      this.dailyRecipePresenter.presentNoDailyRecipe();
    } else {
      this.dailyRecipePresenter.present(dailyRecipe);
    }
  }
}
