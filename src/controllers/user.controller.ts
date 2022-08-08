import { addUserSchema, getUserSchema } from "../models/user";
import { userRepository } from "../repositories/user.repository";
import { HttpResponse } from "../models/httpResponse";

export const getUsers = async (): Promise<HttpResponse> => {
    const users = await userRepository.getUsers();

    return {
        body: users,
        status: 200
    };
};

export const addUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = addUserSchema.parse(request);
    const { name, username } = validatedRequest.body;
    const user = await userRepository.addUser(name, username);

    return {
        body: user,
        status: 200
    };
};

export const getUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getUserSchema.parse(request);
    const id = validatedRequest.params.id;
    const user = await userRepository.getUser(id);

    return {
        body: user,
        status: 200
    };
};


export const userController = { getUser, getUsers, addUser };