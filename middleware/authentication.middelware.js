const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {

    // check token exists on the request
    if (req.header("x-auth-token")) {
        token = req.header("x-auth-token");
        try {
            var user = jwt.verify(token, config.get("JWT_PrivateKey"));
            res.user = user;
            next();
        }
        catch
        {
            res.status(401).send("Access is denied");
        }
    }
    else res.status(400).send("Bad request");



}