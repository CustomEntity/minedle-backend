export abstract class Mapper<T> {
    abstract toEntity(data: any): T;

    abstract toPersistence(entity: T): any;
}
