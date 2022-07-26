import { Handler, Request, Response } from "express";

export const httpHandler = (simpleHandler: SimpleHandler): Handler => {
    return async (req, res) => {
        try {
            await simpleHandler(req, res);
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            res.status(500).json({ error: error instanceof Error ? error.message : "unknown error" });
        }
    }; 
};


type SimpleHandler = (req: Request, res: Response) => Promise<void>