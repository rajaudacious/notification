const { Mongoose } = require("mongoose");
const { json } = require("express");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "superSecretKey";

const addUser = async (req, res) => {
    try {
        const { name, email, password, DOB, DOJ, Department } = req.body;
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            const user = await User.create({
               name, email, password: hash, DOB, DOJ, Department
            });
            console.log(user);
            return res.status(200).json({
                message: "User created successfully", user: user
            })
        }
        else{
            res.status(400).json({message: "User already exist"})
        }
    }
    catch(error){
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user,email,password);
        if (!user) {
            return res.status(401).json({message: "Email and password not match"})
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        console.log(comparePassword);
        if (!comparePassword) {
            return res.status(401).json({message: "Email and password not match"})
        }
        const token = jwt.sign(
            { user: user },
            SECRET_KEY,
            { expiresIn: 86400 }
        )
        return res.status(200).json({message: "Login successfully",token: token})

    }
    catch (error) {
        res.status(400).json({ error });
      }
}


module.exports = {
    addUser,
    loginUser
}


