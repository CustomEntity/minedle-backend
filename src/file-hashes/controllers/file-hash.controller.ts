import {Controller, Get, HttpCode, Inject, Query, Res} from '@nestjs/common';
import { GetFileHashUseCase } from '../usecases/get-file-hash-use-case';
import { ZodValidationPipe } from '../../core/pipes/zod-validation-pipe';
import { FileHashAPI } from '../api';
import {FILE_HASH_PRESENTER} from "../presenters/file-hash-presenter.interface";
import {HttpFileHashPresenter} from "../presenters/http-file-hash-presenter";
import {FastifyReply} from "fastify";

@Controller('file-hashes')
export class FileHashController {
  constructor(
      private readonly getFileHashUseCase: GetFileHashUseCase,
      @Inject(FILE_HASH_PRESENTER)
      private readonly fileHashPresenter: HttpFileHashPresenter,
  ) {}

  @Get()
  @HttpCode(200)
  async getFileHash(
    @Query(new ZodValidationPipe(FileHashAPI.GetFileHash.schema))
    query: FileHashAPI.GetFileHash.Request,
    @Res() response: FastifyReply,
  ) {
    await this.getFileHashUseCase.execute(query);

    const fileHashViewModel = this.fileHashPresenter.getViewModel();
    response.send(fileHashViewModel);
  }
}
