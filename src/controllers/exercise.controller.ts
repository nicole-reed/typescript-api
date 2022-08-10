import { addExerciseRequestSchema, getExerciseRequestSchema } from "../models/exercise";
import { exerciseRepository } from "../repositories/exercise.repository";
import { HttpResponse } from "../models/httpResponse";

export const getExcercises = async (): Promise<HttpResponse> => {
    const exercises = await exerciseRepository.getExercises();

    return {
        body: exercises,
        status: 200
    };
};

export const addExercise = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = addExerciseRequestSchema.parse(request);
    const { name, max, userid } = validatedRequest.body;
    const exercise = exerciseRepository.addExercise(name, max, userid);

    return {
        body: exercise,
        status: 200
    };
};

export const getExercise = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getExerciseRequestSchema.parse(request);
    const id = validatedRequest.params.id;
    const exercise = await exerciseRepository.getExercise(id);

    return {
        body: exercise,
        status: 200
    };
};


export const exerciseController = { getExcercises, getExercise, addExercise };