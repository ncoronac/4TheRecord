import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers(firstname, lastname) {
    let promise;
    if (firstname === undefined && job === undefined ){
        promise = userModel.find();
    } else if (firstname && !lastname) {
        promise = findUserByFirst(firstname);
    } else if (!firstname && lastname) {
        promise = findUserByLast (lastname)
    }
    else {
        promise = findUserByFullName(firstname, lastname)
    }
}

function 