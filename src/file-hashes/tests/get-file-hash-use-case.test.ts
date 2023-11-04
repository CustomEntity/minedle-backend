import {InMemoryFileHashRepository} from '../adapters/in-memory-file-hash-repository';
import {GetFileHashUseCase} from '../usecases/get-file-hash-use-case';
import {FileHash} from '../entities/file-hash';
import {FakeFileHashPresenter} from "./fake-file-hash-presenter";

describe('Feature: Get file hash', () => {
    const fileHash = new FileHash({
        filePath: 'test.json',
        hash: 'f1b944358116ee6ad6e4ac9c1ec4fe60b06912735e61314b4eef90641e118317',
    });
    let fileHashRepository: InMemoryFileHashRepository;
    let getFileHashUseCase: GetFileHashUseCase;
    let fileHashPresenter = new FakeFileHashPresenter();

    beforeEach(() => {
        fileHashPresenter = new FakeFileHashPresenter();
        fileHashRepository = new InMemoryFileHashRepository();
    });

    describe('Scenario: Happy path', () => {
        beforeEach(() => {
            fileHashRepository.save(fileHash);
            getFileHashUseCase = new GetFileHashUseCase(
                fileHashRepository,
                fileHashPresenter,
            );
        });

        it('Given a file path, when I get the file hash, then I should get the file hash', async () => {
            const request = {
                filePath: 'test.json',
            };
            await getFileHashUseCase.handle(request);
            expect(fileHashPresenter.getFileHash()).toEqual(fileHash);
        });
    });

    describe('Scenario: Unhappy path', () => {
        beforeEach(() => {
            fileHashRepository.save(fileHash);
            getFileHashUseCase = new GetFileHashUseCase(
                fileHashRepository,
                fileHashPresenter,
            );
        });

        it('Given a file path, when I get the file hash, then I should not get the file hash', async () => {
            const request = {
                filePath: 'not-existing-file.json',
            };
            await getFileHashUseCase.handle(request);
            expect(fileHashPresenter.getFileHash()).toBeNull();
        });
    });
});
