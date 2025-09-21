declare module "multer" {
    import { Request } from "express";

    export interface MulterFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    }

    export type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void;

    export interface DiskStorageOptions {
        destination?:
        | string
        | ((req: Request, file: MulterFile, cb: (err: Error | null, dest: string) => void) => void);
        filename?:
        | ((req: Request, file: MulterFile, cb: (err: Error | null, name: string) => void) => void);
    }

    export interface Options {
        storage?: any;
        fileFilter?: (req: Request, file: MulterFile, cb: FileFilterCallback) => void;
        limits?: {
            fileSize?: number;
            files?: number;
        };
    }

    interface MulterInstance {
        (options?: Options): any;
        diskStorage: (options: DiskStorageOptions) => any;
    }

    const multer: MulterInstance;
    export default multer;
}
