import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import express from "express";
import jwt from "../utils/jwt";
import { userService } from "../server";
import { User } from "../utils/models";
import { logger } from "../utils/logger";

const permit = new Bearer({ query: "access_token" });

export async function isLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ message: "Permission Denied" });
        }
        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const user = await userService.getUserByUserId(payload.id);
        console.log(user);
        if (user) {
            const { password, ...others } = user;
            req.user = { ...others };
            return next();
        } else {
            return res.status(401).json({ message: "Permission Denied" });
        }
    } catch (e) {
        logger.error(e.message);
        return res.status(401).json({ message: "Permission Denied" });
    }
}

declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, "password">;
        }
    }
}
