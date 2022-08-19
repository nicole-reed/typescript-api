import { addUserRequestSchema, getUserRequestSchema, loginUserRequestSchema } from "../models/user";
import { userRepository } from "../repositories/user.repository";
import { HttpResponse } from "../models/httpResponse";
import { tokenService } from "../services/token.service";
import bcrypt from "bcrypt";

export const getUsers = async (): Promise<HttpResponse> => {
    const users = await userRepository.getUsers();

    return {
        body: users,
        status: 200
    };
};

export const addUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = addUserRequestSchema.parse(request);
    const { name, username, password } = validatedRequest.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.addUser(name, username, hashedPassword);

    return {
        body: user,
        status: 201
    };
};

export const loginUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = loginUserRequestSchema.parse(request);
    const { username, password } = validatedRequest.body;

    const user = await userRepository.loginUser(username, password);

    return {
        body: { ...user, token: tokenService.generateToken(user.id) },
        status: 200
    };
};

export const getUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getUserRequestSchema.parse(request);
    const id = validatedRequest.params.id;
    const user = await userRepository.getUser(id);

    return {
        body: user,
        status: 200
    };
};

export const userController = { getUser, getUsers, addUser, loginUser };