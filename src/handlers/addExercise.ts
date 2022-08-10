import { exerciseController } from "../controllers/exercise.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const addExercise = httpHandler(async(req, res) => {
    const { body, status } = await exerciseController.addExercise(req);
    res.status(status).send(body);
});