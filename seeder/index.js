const { Mongoose } = require("mongoose");
const { json } = require("express");
const bcrypt = require('bcrypt');
const User = require("../model/user");
const data = require("./data.json")
    
const seederData = async () => {
    try {
        const userData = await User.findOne({email:data.email})
        if(userData){
            console.log("admin already added..");
            return
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(data.password, salt);
           await User.create({name:data.name,
           email:data.email,
           password:hash, admin:data.admin,
          
        });
           console.log("admin created successfull..");
        }
    }
    catch(error){
        console.log('cses',error);
    }
};


module.exports = {
    seederData
}

