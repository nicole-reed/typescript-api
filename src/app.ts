import express, { NextFunction, Request, Response } from "express";
import { userController } from "./controllers/user.controller";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("1 Rep Max Tracker Homepage");
    } catch (error) {
        next(error);
    }
});

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, status } = await userController.getUsers();
        res.status(status).send(body);
    } catch (error) {
        next(error);
    }
});

app.get("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, status } = await userController.getUser(req);
        res.status(status).send(body);
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
