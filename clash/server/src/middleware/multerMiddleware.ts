import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Request } from "express";
import type { MulterFile } from "multer";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disk storage
const storage = multer.diskStorage({
    destination: (req: Request, file: MulterFile, cb: (err: Error | null, dest: string) => void) => {
        cb(null, path.resolve(__dirname, "../../public/images"));
    },
    filename: (req: Request, file: MulterFile, cb: (err: Error | null, name: string) => void) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter
function fileFilter(
    req: Request,
    file: MulterFile,
    cb: (error: Error | null, acceptFile: boolean) => void
) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
}

// Multer instance
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
