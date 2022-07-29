import { userController } from "../controllers/user.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const addUser = httpHandler(async (req, res) => {
    const { body, status } = await userController.addUser(req);
    res.status(status).send(body);
});