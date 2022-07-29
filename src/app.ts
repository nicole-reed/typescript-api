import express from "express";
import { userController } from "./controllers/user.controller";
import { httpHandler } from "./wrappers/handler.wrapper";

const app = express();
const port = 3000;

app.get("/", httpHandler(async (req, res) => {
    res.send("homepage");
}));

app.get("/users", httpHandler(async (req, res) => {
    const { body, status } = await userController.getUsers();
    res.status(status).send(body);
}));

app.get("/users/:id", httpHandler(async (req, res) => {
    const { body, status } = await userController.getUser(req);
    res.status(status).send(body);
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
