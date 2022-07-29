import { Handler, Request, Response } from "express";

export const httpHandler = (simpleHandler: SimpleHandler): Handler => {
    return async (req, res) => {
        try {
            await simpleHandler(req, res);
        } catch (error) {
            res.status(500).json({ error });
        }
    }; 
};


type SimpleHandler = (req: Request, res: Response) => Promise<void>