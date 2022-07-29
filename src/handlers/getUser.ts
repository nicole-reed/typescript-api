import { userController } from "../controllers/user.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getUser = httpHandler(async (req, res) => {
    const { body, status } = await userController.getUser(req);
    res.status(status).send(body);
});