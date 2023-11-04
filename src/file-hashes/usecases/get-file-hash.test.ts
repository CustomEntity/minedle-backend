import {InMemoryFileHashRepository} from "../adapters/in-memory-file-hash-repository";
import {GetFileHash} from "./get-file-hash";
import {FileHash} from "../entities/file-hash";
import {FileHashPresenter} from "../presenters/file-hash-presenter.interface";

describe('Feature: Get file hash', () => {
    const fileHash = new FileHash({
        filePath: 'test.json',
        hash: 'f1b944358116ee6ad6e4ac9c1ec4fe60b06912735e61314b4eef90641e118317'
    });
    let fileHashRepository: InMemoryFileHashRepository;
    let getFileHashUseCase: GetFileHash;
    let mockFileHashPresenter: jest.Mocked<FileHashPresenter>;

    beforeEach(() => {
        mockFileHashPresenter = {
            present: jest.fn(),
            presentNoFileHash: jest.fn(),
        };
        fileHashRepository = new InMemoryFileHashRepository();
    });

    describe('Scenario: Happy path', () => {
        beforeEach(() => {
            fileHashRepository.save(fileHash);
            getFileHashUseCase = new GetFileHash(mockFileHashPresenter, fileHashRepository);
        });

        it('Given a file path, when I get the file hash, then I should get the file hash', async () => {
            const request = {
                filePath: 'test.json'
            };
            await getFileHashUseCase.handle(request);
            expect(mockFileHashPresenter.present).toHaveBeenCalledWith(fileHash);
            expect(mockFileHashPresenter.presentNoFileHash).not.toHaveBeenCalled();
        });
    });

    describe('Scenario: Unhappy path', () => {
        beforeEach(() => {
            fileHashRepository.save(fileHash);
            getFileHashUseCase = new GetFileHash(mockFileHashPresenter, fileHashRepository);
        });

        it('Given a file path, when I get the file hash, then I should not get the file hash', async () => {
            const request = {
                filePath: 'another-file.json'
            };
            await getFileHashUseCase.handle(request);
            expect(mockFileHashPresenter.present).not.toHaveBeenCalled();
            expect(mockFileHashPresenter.presentNoFileHash).toHaveBeenCalled();
        });
    });

});