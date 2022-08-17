import bodyParser from "body-parser";
import express from "express";
import { addUser } from "./handlers/addUser";
import { getHomepage } from "./handlers/getHomepage";
import { getUser } from "./handlers/getUser";
import { getUsers } from "./handlers/getUsers";
import { getExercisesByUserId } from "./handlers/getExercisesByUserId";
import { getExercise } from "./handlers/getExercise";
import { getExercises } from "./handlers/getExercises";
import { addExercise } from "./handlers/addExercise";
import { loginUser } from "./handlers/loginUser";
import { authenticateUser } from "./middleware/authMiddleware";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", getHomepage);

app.get("/users", getUsers);

app.get("/users/:id", getUser);

app.post("/users", addUser);

app.post("/users/login", loginUser);

app.get("/users/:userid/exercises", getExercisesByUserId);

app.get("/exercises/:id", getExercise);

app.post("/exercises", authenticateUser, addExercise);

app.get("/exercises", getExercises);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
