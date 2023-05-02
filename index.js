const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoute = require("./routes/users.routes");
const postRoute = require("./routes/posts.routes");
const authenticate = require("./middlewares/auth");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use(authenticate);
app.use("/posts", postRoute);

app.listen(process.env.PORT, async (req, res) => {
    try {
        await connection;
        console.log("connected");
    } catch (e) {
        console.log(e);
    }
});
