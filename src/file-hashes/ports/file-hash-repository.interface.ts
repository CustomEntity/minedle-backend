import {FileHash} from "../entities/file-hash";

export const I_FILE_HASH_REPOSITORY = Symbol('I_FILE_HASH_REPOSITORY');

export interface FileHashRepository {
    findByFilePath(filePath: string): Promise<FileHash>;

    save(fileHash: FileHash): Promise<void>;
}