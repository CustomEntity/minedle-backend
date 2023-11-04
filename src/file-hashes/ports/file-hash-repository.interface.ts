import { FileHash } from '../entities/file-hash';
import { Nullable } from '../../shared/nullable';

export const FILE_HASH_REPOSITORY = Symbol('FILE_HASH_REPOSITORY');

export interface FileHashRepository {
  findByFilePath(filePath: string): Promise<Nullable<FileHash>>;

  save(fileHash: FileHash): Promise<void>;
}
