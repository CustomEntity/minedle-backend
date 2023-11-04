import {FileHashRepository} from "../ports/file-hash-repository.interface";
import {FileHash} from "../entities/file-hash";

export class InMemoryFileHashRepository implements FileHashRepository {
    constructor(
        public readonly database: FileHash[] = []
    ) {
    }

    findByFilePath(filePath: string): Promise<FileHash> {
        return Promise.resolve(this.database.find(fileHash => fileHash.filePath === filePath));
    }

    save(fileHash: FileHash): Promise<void> {
        this.database.push(fileHash);
        return Promise.resolve();
    }
}