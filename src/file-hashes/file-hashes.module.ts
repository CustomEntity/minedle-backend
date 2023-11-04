import {Module, Scope} from '@nestjs/common';
import {FileHashController} from "./controllers/file-hash.controller";
import {FILE_HASH_REPOSITORY} from "./ports/file-hash-repository.interface";
import {InMemoryFileHashRepository} from "./adapters/in-memory-file-hash-repository";
import {FILE_HASH_PRESENTER} from "./presenters/file-hash-presenter.interface";
import {HttpFileHashPresenter} from "./presenters/http-file-hash-presenter";
import {GetFileHashUseCase} from "./usecases/get-file-hash-use-case";
import {KnexService} from "../core/adapters/knex/knex.service";
import {KnexFileHashRepository} from "./adapters/knex-file-hash-repository";
import {KnexModule} from "../core/adapters/knex/knex.module";

@Module({
    imports: [KnexModule],
    controllers: [FileHashController],
    providers: [
        {
            provide: FILE_HASH_REPOSITORY,
            useFactory: (knexService: KnexService) => {
                return new KnexFileHashRepository(knexService.connection);
            },
            inject: [KnexService],
        },
        {
            provide: FILE_HASH_PRESENTER,
            useClass: HttpFileHashPresenter,
            scope: Scope.REQUEST,
        },
        {
            provide: GetFileHashUseCase,
            useFactory: (
                fileHashRepository: InMemoryFileHashRepository,
                fileHashPresenter: HttpFileHashPresenter,
            ) => {
                return new GetFileHashUseCase(
                    fileHashRepository,
                    fileHashPresenter,
                );
            },
            inject: [
                FILE_HASH_REPOSITORY,
                FILE_HASH_PRESENTER,
            ],
        }
    ],
    exports: [
        FILE_HASH_REPOSITORY,
        FILE_HASH_PRESENTER,
        GetFileHashUseCase,
    ]
})
export class FileHashesModule {
}
