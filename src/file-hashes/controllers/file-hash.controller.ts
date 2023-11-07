import { Controller, Get, HttpCode, Inject, Param, Res } from '@nestjs/common';
import { GetFileHashUseCase } from '../usecases/get-file-hash-use-case';
import { ZodValidationPipe } from '../../core/pipes/zod-validation-pipe';
import { FileHashAPI } from '../api';
import { FILE_HASH_PRESENTER } from '../presenters/file-hash-presenter.interface';
import { HttpFileHashPresenter } from '../presenters/http-file-hash-presenter';
import { FastifyReply } from 'fastify';
import * as z from 'zod';

@Controller('file-hashes')
export class FileHashController {
  constructor(
    private readonly getFileHashUseCase: GetFileHashUseCase,
    @Inject(FILE_HASH_PRESENTER)
    private readonly fileHashPresenter: HttpFileHashPresenter,
  ) {}

  @Get(':filePath')
  @HttpCode(200)
  async getFileHash(
    @Param('filePath', new ZodValidationPipe(FileHashAPI.GetFileHash.schema))
    filePath: z.infer<typeof FileHashAPI.GetFileHash.schema>,
    @Res() response: FastifyReply,
  ) {
    await this.getFileHashUseCase.execute({ filePath });

    const fileHashViewModel = this.fileHashPresenter.getViewModel();
    response.send(fileHashViewModel);
  }
}
