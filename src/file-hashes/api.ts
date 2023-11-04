import {z} from 'zod';

export namespace FileHashAPI {
    export namespace GetFileHash {
        export const schema = z.string().min(1);

        export type Request = z.infer<typeof schema>;
    }
}
