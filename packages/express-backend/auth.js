import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./models/user-services.js";

const creds = [];

function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

export async function registerUser(req, res) {
    try {
        const { firstname, lastname, username, email, pwd } = req.body;
        if (!firstname || !lastname || !username || !email || !pwd) {
            return res.status(400).send("Missing required fields");
        }

        const existing = await userServices.findUserByUsername(username);
        if (existing) return res.status(409).send("Username already taken");

        const hashedPassword = await bcrypt.hash(pwd, 10);

        const saved = await userServices.addUser({
            firstname,
            lastname,
            username,
            email,
            hashedPassword,
        });

        const token = await generateAccessToken(username);
        return res
            .status(201)
            .send({ token, user: { id: saved._id, username } });

    } catch (err) {
        console.error("loginUser error:", err);
        return res.status(400).send("loginUser error"); //fixed this to become a 400 error!
    }
}

export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                console.log("JWT error:", error);
                res.status(401).end();
            }
        });
    }
}

export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    const retrievedUser = creds.find((c) => c.username === username);

    if (!retrievedUser) {
        // invalid username
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then((token) => {
                        res.status(200).send({ token: token });
                    });
                } else {
                    // invalid password
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    }
}
