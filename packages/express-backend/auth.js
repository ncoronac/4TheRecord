import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const creds = [];

export function registerUser(req, res){
    const {username, pwd} = req.body;

    if (!username || !pwd) {
        res.status(400).send("Bad Request: Invalid Input Data");
    }
    else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken");
    }
    else {
        bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
                generateAccessToken(username).then((token) => {
                    console.log("Token: ", token);
                    res.status(201).send({token: token});
                    creds.push({username, hashedPassword });

                });
            });
    }

}