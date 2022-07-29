import { Handler, Request, Response } from "express";

export const httpHandler = (simpleHandler: SimpleHandler): Handler => {
    return async (req, res, next) => {
        try {
            await simpleHandler(req, res);
        } catch (error) {
            next(error);
        }
    }; 
};


type SimpleHandler = (req: Request, res: Response) => Promise<void>