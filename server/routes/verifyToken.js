const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    console.log("Backend token : ", req.headers.token);
    if (authHeader) {

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!!", err);
            }
            else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json("You are not authenticated!", err);
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {

        // if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        // } else {
        //     res.status(403).json("You are not allowed to do that!", req.user.id , req.params.id );
        // }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {


        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };