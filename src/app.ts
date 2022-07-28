import express, { Request, Response } from 'express';
import { getUserSchema } from './models/user';
import {getUser, getUsers} from './repositories/users';

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
    const users = await getUsers()
    res.send(users);
});

app.get('/:id', async (req: Request, res: Response) => {
    const validatedRequest = getUserSchema.parse(req)
    const id = validatedRequest.params.id
    const user = await getUser(id)
    res.send(user);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
