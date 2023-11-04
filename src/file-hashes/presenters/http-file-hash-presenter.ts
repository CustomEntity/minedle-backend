import {FileHash} from '../entities/file-hash';
import {FileHashPresenter} from "./file-hash-presenter.interface";
import {Nullable} from "../../shared/nullable";
import {NotFoundException} from "@nestjs/common";
import {FileHashViewmodel} from "../view-models/file-hash-viewmodel";
import * as assert from "assert";


export class HttpFileHashPresenter implements FileHashPresenter {
    private fileHash: Nullable<FileHashViewmodel> = null;

    present(fileHash: FileHash): void {
        this.fileHash = {
            filePath: fileHash.filePath,
            hash: fileHash.hash,
        };
    }

    presentNoFileHash(): void {
        throw new NotFoundException('File hash not found');
    }

    getViewModel(): FileHashViewmodel {
        assert(this.fileHash !== null, 'File hash not found');
        return <FileHashViewmodel>this.fileHash;
    }
}