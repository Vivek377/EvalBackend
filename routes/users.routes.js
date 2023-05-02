const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/users.models");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(200).send({ msg: "user already present" });
        } else {
            bcrypt.hash(password, 5, async (err, hashed) => {
                if (err) {
                    res.status(400).send({ err: err });
                } else {
                    const newUser = new UserModel(req.body);
                    console.log(hashed);
                    await newUser.save({ name, email, gender, password: hashed })
                    res.status(200).send({ msg: "user registered successfully" });
                }
            })
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (err) {
                    res.status(200).send({ err: "invalid password" });
                } else {
                    const token = jwt.sign({ "userId": user._id }, "secret");
                    res.status(200).send({ msg: "loggged in", token: token });
                }
            })
        } else {
            res.status(200).send({ err: "no users found" });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

module.exports = userRoute;
