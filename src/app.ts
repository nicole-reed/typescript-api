import bodyParser from "body-parser";
import express from "express";
import { addUser } from "./handlers/addUser";
import { getHomepage } from "./handlers/getHomepage";
import { getUser } from "./handlers/getUser";
import { getUsers } from "./handlers/getUsers";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", getHomepage);

app.get("/users", getUsers);

app.get("/users/:id", getUser);

app.post("/users", addUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
