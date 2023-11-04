import { FileHash } from '../entities/file-hash';

export const FILE_HASH_PRESENTER = Symbol('FILE_HASH_PRESENTER');

export interface FileHashPresenter {
  present(fileHash: FileHash): void;

  presentNoFileHash(): void;
}
