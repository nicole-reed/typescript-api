import { Firestore } from "@google-cloud/firestore";
import { User, userSchema } from "../models/user";
import { v4 } from "uuid";

export const getUsers = async (): Promise<User[]> => {
    const client = new Firestore();

    const usersSnapshot = await client.collection("users").get();

    const rawUsers = usersSnapshot.docs.map(doc => doc.data());

    const users = rawUsers.map(user => userSchema.parse(user));

    return users;
};

export const addUser = async (name: string, username: string): Promise<void> => {
    const client = new Firestore();
    const usersCollectionRef = client.collection("users");

    await client.runTransaction(async (transaction) => {
        const users = await transaction.get(usersCollectionRef.where("username", "==", username));

        if (users.docs.length > 0){
            throw new Error(`user with username ${username} already exists`);
        }

        const id = v4();
        return transaction.create(usersCollectionRef.doc(id), { name, username, id });
    });
};

export const getUser = async (id: string): Promise<User> => {
    const client = new Firestore();

    const userSnapshot = await client.collection("users").doc(id).get();

    const rawUser = userSnapshot.data();

    if (!rawUser) {
        throw new Error(`user with id ${id} doesn't exist`);
    }

    const user = userSchema.parse(rawUser);

    return user;
};

export const userRepository = { getUser, getUsers, addUser };
