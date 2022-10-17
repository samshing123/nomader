import formidable from "formidable";
import type { Fields, Files } from "formidable";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

declare global {
    namespace Express {
        interface Request {
            form?: {
                fields: Fields;
                files: Files;
            };
        }
    }
}

const uploadDir = path.join(__dirname, "../", "assets", "post");

const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    multiples: false,
    maxFileSize: 500 * 1024 ** 2,
    filter: (part) => part.mimetype?.startsWith("image/") || false,
});

export function postMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    form.parse(req, (err, fields, files) => {
        if (err) {
            logger.error(err.toString());
            res.status(400).json({ success: false, message: "Fail to upload" });
            return;
        }
        req.form = { fields, files };
        next();
    });
}
