import { FileHashRepository } from '../ports/file-hash-repository.interface';
import { UseCase } from '../../shared/usecase';
import { FileHashPresenter } from '../presenters/file-hash-presenter.interface';

export type Request = {
  filePath: string;
};

export class GetFileHashUseCase extends UseCase<Request> {
  constructor(
    private readonly fileHashRepository: FileHashRepository,
    private readonly fileHashPresenter: FileHashPresenter,
  ) {
    super();
  }

  async handle(request: Request): Promise<void> {
    const filePath = await this.fileHashRepository.findByFilePath(
      request.filePath,
    );

    if (filePath) {
      await this.fileHashPresenter.present(filePath);
    } else {
      await this.fileHashPresenter.presentNoFileHash();
    }
  }
}
