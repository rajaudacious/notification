const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require('cors')

app.use(cors())

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT)
.then(()=>{console.log("db connected")}).catch((error)=>{console.log(error)})

const notificationRoutes = require("./routes/user");

app.use("/api/users",notificationRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));