import { Firestore } from "@google-cloud/firestore";
import { User, userSchema, UserWithoutPassword } from "../models/user";
import { v4 } from "uuid";
import bcrypt from "bcrypt";


export const getUsers = async (): Promise<UserWithoutPassword[]> => {
    const client = new Firestore();

    const usersSnapshot = await client.collection("users").get();

    const rawUsers = usersSnapshot.docs.map(doc => doc.data());

    const users = rawUsers.map(user => stripUser(userSchema.parse(user)));
    
    return users;
};

export const addUser = async (name: string, username: string, password: string): Promise<void> => {
    const client = new Firestore();
    const usersCollectionRef = client.collection("users");

    await client.runTransaction(async (transaction) => {
        const users = await transaction.get(usersCollectionRef.where("username", "==", username));

        if (users.docs.length > 0){
            throw new Error(`user with username ${username} already exists`);
        }

        const id = v4();
        return transaction.create(usersCollectionRef.doc(id), { name, username, password, id });
    });
};

export const loginUser = async (username: string, password: string): Promise<UserWithoutPassword> => {
    const client = new Firestore();
    
    const usersSnapshot = await client.collection("users").where("username", "==", username).get();

    const [rawUser] = usersSnapshot.docs;

    if (!rawUser) {
        throw new Error(`user with username ${username} doesn't exist`);
    }

    const user = userSchema.parse(rawUser.data());

    if (await bcrypt.compare(password, user.password)) {
        return stripUser(user);
    } 
    
    throw new Error("invalid credentials");
    
};

export const getUser = async (id: string): Promise<UserWithoutPassword> => {
    const client = new Firestore();

    const userSnapshot = await client.collection("users").doc(id).get();

    const rawUser = userSnapshot.data();

    if (!rawUser) {
        throw new Error(`user with id ${id} doesn't exist`);
    }

    const user = userSchema.parse(rawUser);

    return stripUser(user);
};

function stripUser (user: User): UserWithoutPassword {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
}

export const userRepository = { getUser, getUsers, addUser, loginUser };
