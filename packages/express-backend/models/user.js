import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: false,
            trim: true
        },
        date:{
            type: Date,
            required: true
        },
        body:{
            type: String,
            required: false,
            trim: true
        },
    },
    {collection: "entries_list"}
);

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
            trim: true,
        },
        email:{
            type: String,
            required: true, 
            trim: true,
        },
        entries:{
            type: Array,
            required: false,
            trim: true
        }
    },
    {collection: "users_list"}
);

const User = mongoose.model("User", UserSchema);

export default User;