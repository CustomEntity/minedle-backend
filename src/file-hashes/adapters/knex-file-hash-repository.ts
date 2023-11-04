import {FileHashRepository} from '../ports/file-hash-repository.interface';
import {FileHash} from '../entities/file-hash';
import {Nullable} from '../../shared/nullable';
import {Knex} from "knex";
import {Injectable} from "@nestjs/common";
import {Mapper} from "../../shared/mapper";

export const FILE_HASH_TABLE = 'file_hashes';

@Injectable()
export class KnexFileHashRepository implements FileHashRepository {

    private readonly mapper: KnexFileHashMapper = new KnexFileHashMapper();

    constructor(private readonly connection: Knex) {
    }

    async findByFilePath(filePath: string): Promise<Nullable<FileHash>> {
        const data = await this.connection(FILE_HASH_TABLE)
            .select('*')
            .where('file_path', filePath)
            .first();

        if (!data) {
            return null;
        }
        return this.mapper.toEntity(data);
    }

    async save(fileHash: FileHash): Promise<void> {
        await this.connection(FILE_HASH_TABLE)
            .insert(this.mapper.toPersistence(fileHash));

        return Promise.resolve();
    }
}

export class KnexFileHashMapper extends Mapper<FileHash> {
    toEntity(data: any): FileHash {
        return new FileHash({
            filePath: data.file_path,
            hash: data.hash,
        });
    }

    toPersistence(entity: FileHash): any {
        return {
            file_path: entity.filePath,
            hash: entity.hash,
        };
    }


}