import mongoose from "mongoose";
import schema from "./user.js";
import dotenv from "dotenv";
const { User, Entry } = schema;

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

function getUsers() {
    return User.find().lean();
}
function findUserByUsername(username){
    schema.User.find({ username: {username } })
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
    findUserByUsername
};
