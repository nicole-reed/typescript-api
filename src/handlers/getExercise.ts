import { exerciseController } from "../controllers/exercise.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getExercise = httpHandler(async(req, res) => {
    const { body, status } = await exerciseController.getExercise(req);
    res.status(status).send(body);
});
