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
    {collection: "entries_list"},
    // {_id: false} // optional: turns off automatic "_id" category
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
            type: [EntrySchema], // each user has a list of entries
            required: false,
            default: []
        }
    },
    {collection: "users_list"}
);

const User = mongoose.model("User", UserSchema);

export default User;