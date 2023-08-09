const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({

    Department:{
        type:String
    },
    message:{
        type: String
    },
    isRead:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Notification", notificationSchema);