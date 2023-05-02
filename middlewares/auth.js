const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {

        const decoded = jwt.verify(token, "secret");
        if (decoded) {
            req.body.userId = decoded.userId;
            next();
        } else {
            res.status(400).send({ err: "please login first" })
        }
    }

    else {
        res.status(400).send({ err: "please login first" })
    }

}
module.exports = authenticate;
