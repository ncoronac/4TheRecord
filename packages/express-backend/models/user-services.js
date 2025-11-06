import mongoose from "mongoose";
import schema from "./user.js";
import dotenv from 'dotenv'

dotenv.config()
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
    let promise;
    if (firstname === undefined && lastname === undefined ){
        promise = schema.User.find();
    } else if (firstname && !lastname) {
        promise = findUserByFirst(firstname); // method DNE
    } else if (!firstname && lastname) {
        promise = findUserByLast (lastname); // method DNE 
    }
    else {
        promise = findUserByFullName(firstname, lastname); // method DNE
    }
    return promise;
}

function addUser(user){
    const userToAdd = new schema.User(user);
    const promise = userToAdd.save();
    return promise;
}

export default {
    getUsers,
    addUser
};