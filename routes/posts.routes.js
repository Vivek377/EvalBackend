const express = require("express");
const jwt = require("jsonwebtoken");
const PostModel = require("../models/posts.model");
const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");

        if (decoded) {
            const userId = decoded.userId;
            const posts = await PostModel.find({ userId });
            res.status(200).send(posts);
        } else {
            res.status(200).send({ err: "please login first" })
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

postRoute.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({ msg: "new post added" })
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

postRoute.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: "post updated" })
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

postRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "post deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = postRoute;
