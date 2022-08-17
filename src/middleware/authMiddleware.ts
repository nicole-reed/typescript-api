import { Request as BaseRequest, Response, NextFunction } from "express";
import { validateToken } from "../services/token.service";

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const { id } = validateToken(token);

        req.user = { id };

        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};

interface Request extends BaseRequest {
    user?: {
        id: string
    }
}