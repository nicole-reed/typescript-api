import { userController } from "../controllers/user.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getUsers = httpHandler(async (req, res) => {
    const { body, status } = await userController.getUsers();
    res.status(status).send(body);
});