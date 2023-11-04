import {z} from 'zod';

export namespace FileHashAPI {
    export namespace GetFileHash {
        export const schema = z.object({
            filePath: z.string(),
        });

        export type Request = z.infer<typeof schema>;
    }
}
