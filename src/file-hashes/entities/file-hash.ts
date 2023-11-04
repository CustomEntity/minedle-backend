import {Entity} from "../../shared/entity";

export type FileHashData = {
    filePath: string;
    hash: string;
}

export class FileHash extends Entity<FileHashData> {
    get filePath(): string {
        return this.data.filePath;
    }

    get hash(): string {
        return this.data.hash;
    }
}