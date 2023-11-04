import {FileHashRepository} from '../ports/file-hash-repository.interface';
import {FileHash} from '../entities/file-hash';
import {Nullable} from '../../shared/nullable';

export class InMemoryFileHashRepository implements FileHashRepository {
    constructor(public readonly database: FileHash[] = []) {
        this.database.push(new FileHash({
            filePath: 'test',
            hash: 'test',
        }));
    }

    findByFilePath(filePath: string): Promise<Nullable<FileHash>> {
        return Promise.resolve(
            this.database.find((fileHash) => fileHash.filePath === filePath) ?? null,
        );
    }

    save(fileHash: FileHash): Promise<void> {
        this.database.push(fileHash);
        return Promise.resolve();
    }
}
