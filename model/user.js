const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    DOB:{
        type:String
    },
    DOJ:{
        type:String
    },
    Department:{
        type:String
    },
    isRead: {
        type: Boolean,
        default:false
    },
    admin: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model("User", userSchema);