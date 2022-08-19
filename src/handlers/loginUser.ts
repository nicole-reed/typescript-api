import { userController } from "../controllers/user.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const loginUser = httpHandler(async (req, res) => {
    const { body, status } = await userController.loginUser(req);
    res.status(status).send(body);
});