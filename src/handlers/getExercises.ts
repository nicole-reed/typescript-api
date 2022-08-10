import { exerciseController } from "../controllers/exercise.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getExercises = httpHandler(async(req, res) => {
    const { body, status } = await exerciseController.getExcercises();
    res.status(status).send(body);
});