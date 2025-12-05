import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";
const app = express();
const port = 8000;
import { registerUser, loginUser, authenticateUser } from "./auth.js";

app.use(cors()); // lets backend respond to calls from diff. locations (cross-origin resource sharing)
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// api calls / methods:
app.get("/users", async (req, res) => {
    try {
        const result = await userServices.getUsers();
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/entries", async (req, res) => {
    try {
        const result = await userServices.getEntries();
        res.send({ entries_list: result }); // entries_list defined in user.js Entry schema as the mongo collection name for this resource
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.post("/users", authenticateUser, (req, res) => {
    const userToAdd = req.body;

    console.log("trying to add this user", userToAdd);

    userServices
        .addUser(userToAdd)
        .then((user) => res.status(201).send(user))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

app.post("/entries", (req, res) => {
    const entryToAdd = req.body;
    console.log("in backend: ", entryToAdd);
    userServices
        .addEntry(entryToAdd)
        .then((entry) => res.status(201).send(entry))
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening");
});
