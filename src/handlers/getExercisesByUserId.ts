import { exerciseController } from "../controllers/exercise.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getExercisesByUserId = httpHandler(async(req, res) => {
    const { body, status } = await exerciseController.getExercisesByUserId(req);
    res.status(status).send(body);
});
