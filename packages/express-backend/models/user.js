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
<<<<<<< HEAD
    {collection: "entries_list"},
    // {_id: false} // optional: turns off automatic "_id" category
=======
    {collection: "entries_list"}
>>>>>>> 0282cb9 (added cors to backend, progress creating user entries in database)
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
<<<<<<< HEAD
            type: [EntrySchema], // each user has a list of entries
            required: false,
            default: []
=======
            type: Array,
            required: false,
            trim: true
>>>>>>> 0282cb9 (added cors to backend, progress creating user entries in database)
        }
    },
    {collection: "users_list"}
);

const User = mongoose.model("User", UserSchema);
const Entry = mongoose.model("Entry", EntrySchema);

export default { User, Entry };