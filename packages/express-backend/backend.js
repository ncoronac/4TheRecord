// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

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

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = userServices.addUser(userToAdd)
    .then((user) => res.status(201).send(user))
    .catch((error) => console.log(error))
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});