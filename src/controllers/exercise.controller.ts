import { addExerciseRequestSchema, getExerciseRequestSchema, getExercisesByUserIdRequestSchema } from "../models/exercise";
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
    const { id } = validatedRequest.user;
    const { name, max, units } = validatedRequest.body;
    const exercise = await exerciseRepository.addExercise(name, max, units, id);

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

export const getExercisesByUserId = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getExercisesByUserIdRequestSchema.parse(request);
    const userid = validatedRequest.params.userid;
    const exercises = await exerciseRepository.getExercisesByUserId(userid);

    return {
        body: exercises,
        status: 200
    };
};


export const exerciseController = { getExcercises, getExercise, addExercise, getExercisesByUserId };