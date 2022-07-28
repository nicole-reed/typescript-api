import { Firestore } from "@google-cloud/firestore";
import { User, userSchema } from "../models/user";

export const getUsers = async (): Promise<User[]> => {
    const client = new Firestore();

    const usersSnapshot = await client.collection("users").get();

    const rawUsers = usersSnapshot.docs.map(doc => doc.data());

    const users = rawUsers.map(user => userSchema.parse(user));

    return users;
};

export const getUser = async (id: string): Promise<User> => {
    const client = new Firestore();

    const userSnapshot = await client.collection("users").doc(id).get();

    const rawUser = userSnapshot.data();

    if (!rawUser) {
        throw new Error(`user with id ${id} doesnt exist`);
    }

    const user = userSchema.parse(rawUser);

    return user;
};

export const userRepository = { getUser, getUsers };
