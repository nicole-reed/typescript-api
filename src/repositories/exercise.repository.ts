import { Firestore } from "@google-cloud/firestore";
import { v4 } from "uuid";
import { Exercise, exerciseSchema } from "../models/exercise";


export const getExercises = async (): Promise<Exercise[]> => {
    const client = new Firestore();

    const exercisesSnapshot = await client.collection("exercises").get();

    const rawExercises = exercisesSnapshot.docs.map(doc => doc.data());

    const exercises = rawExercises.map(exercise => exerciseSchema.parse(exercise));

    return exercises;
};

export const addExercise = async (name: string, max: string, userid: string): Promise<void> => {
    const client = new Firestore();

    const id = v4();
    await client.collection("exercises").doc(id).set({ name, max, userid, id });

    return;
};

export const getExercise = async (id: string): Promise<Exercise> => {
    const client = new Firestore();

    const exerciseSnapshot = await client.collection("exercises").doc(id).get();

    const rawExercise = exerciseSnapshot.data();

    if (!rawExercise) {
        throw new Error(`exercise with id ${id} doesnt exist`);
    }

    const exercise = exerciseSchema.parse(rawExercise);

    return exercise;
};

export const exerciseRepository = { getExercise, getExercises, addExercise };
