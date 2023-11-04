import {FileHash} from '../entities/file-hash';
import {FileHashPresenter} from "../presenters/file-hash-presenter.interface";
import {Nullable} from "../../shared/nullable";

export class FakeFileHashPresenter implements FileHashPresenter {
    private fileHash: Nullable<FileHash> = null;

    present(fileHash: FileHash): void {
        this.fileHash = fileHash;
    }

    presentNoFileHash(): void {
        this.fileHash = null;
    }

    getFileHash(): Nullable<FileHash> {
        return this.fileHash;
    }
}