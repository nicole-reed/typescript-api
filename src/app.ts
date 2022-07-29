import express from "express";
import { getHomepage } from "./handlers/getHomepage";
import { getUser } from "./handlers/getUser";
import { getUsers } from "./handlers/getUsers";

const app = express();
const port = 3000;

app.get("/", getHomepage);

app.get("/users", getUsers);

app.get("/users/:id", getUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
