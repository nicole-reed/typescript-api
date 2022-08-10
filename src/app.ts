import bodyParser from "body-parser";
import express from "express";
import { addUser } from "./handlers/addUser";
import { getHomepage } from "./handlers/getHomepage";
import { getUser } from "./handlers/getUser";
import { getUsers } from "./handlers/getUsers";
import { getExercises } from "./handlers/getExercises";
import { getExercise } from "./handlers/getExercise";
import { addExercise } from "./handlers/addExercise";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", getHomepage);

app.get("/users", getUsers);

app.get("/users/:id", getUser);

app.post("/users", addUser);

app.get("/exercises", getExercises);

app.get("/exercises/:id", getExercise);

app.post("/exercises", addExercise);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
