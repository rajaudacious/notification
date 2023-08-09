const User = require("../model/user");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ValidateToken = async (req, res, next) => {
    const token = req.headers["authorization"]
        ? req.headers["authorization"].replace("Bearer ", "").trim()
        : "";
    if (!token) {
        return res.status(401).json({
            code: "NOT_AUTHORISED",
            message: "Unauthorized, Please provide authentication token!",
        });
    }
    try {
        const tokenData = jwt.verify(token, 'superSecretKey');
        console.log(tokenData.user,"currentUsercurrentUser");
        const currentUser = await User.findOne({
            email : tokenData.user.email
        });
        console.log(currentUser,"currentUser");
        if (!currentUser) {
            return res.status(401).json({
                code: "NOT_AUTHORISED",
                message: "Unauthorized",
            });
        }
        req.currentUser = currentUser;
        next();
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            code: "NOT_AUTHORISED",
            message: "Your login session has been expired, Please login again.",
        });
    }
};


module.exports = { ValidateToken }