import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            trim: true,
        },
        lastname:{
            type: String,
            required: true,
            trim:true,
        },
        email:{
            type: String,
            required: true, 
            trim: true,
        },
    },
    {collection: "users_list"}
);