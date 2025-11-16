import mongoose from "mongoose";
import schema from "./user.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

const uri = process.env.MONGODB_URI;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

function getUsers(firstname, lastname) {
    if (firstname === undefined && lastname === undefined) {
        schema.User.find();
    }
}

function getEntries() {
    // eventually pass parameters that are related to how we want to filter entries -- like account, etc??
    let promise = schema.Entry.find();
    return promise;
}

function addUser(user) {
    const userToAdd = new schema.User(user);
    const promise = userToAdd.save();
    return promise;
}

function addEntry(entry) {
    const entryToAdd = new schema.Entry(entry);
    const promise = entryToAdd.save();
    return promise;
}

export default {
    getUsers,
    addUser,
    getEntries,
    addEntry,
};
