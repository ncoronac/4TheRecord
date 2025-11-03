import mongoose from "mongoose";
import schema from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/4TheRecordUsers", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

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

function getEntries(){ // eventually pass parameters that are related to how we want to filter entries -- like account, etc??
    let promise = schema.Entry.find();
    return promise;
}

function addUser(user){
    const userToAdd = new schema.User(user);
    const promise = userToAdd.save();
    return promise;
}

function addEntry(entry){
    const entryToAdd = new schema.Entry(entry);
    const promise = entryToAdd.save();
    return promise;
}

export default {
    getUsers,
    addUser,
    getEntries,
    addEntry
};