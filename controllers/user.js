const { Mongoose } = require("mongoose");
const User = require("../model/user");
const { json } = require("express");

const addUser = async (req, res) => {
    try {
        const { name, age, mobile, DOB } = req.body;

        const user = await User.create({
           name, age, mobile, DOB
        });
        console.log(user);
        return res.status(200).json({
            message: "user created successfully", user: user
        })
    }
    catch(error){
        res.status(400).send(error);
    }
};

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error);

    }
};

module.exports = {
    addUser,
    getAllUser
}


