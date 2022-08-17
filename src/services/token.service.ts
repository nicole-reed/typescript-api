import jwt from "jsonwebtoken";
import { jwtPayloadSchema, JwtPayload } from "../models/jwtPayload";

export const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error ("process.env.JWT_SECRET needs to be set");
    }

    const payload: JwtPayload = { id };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const validateToken = (token: string): JwtPayload => {
    if (!process.env.JWT_SECRET) {
        throw new Error ("process.env.JWT_SECRET needs to be set");
    }
    
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

    return jwtPayloadSchema.parse(decodedJwt);
};

export const tokenService = { generateToken, validateToken };
