const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const {seederData} = require("./seeder/index")
var cors = require('cors')



app.use(cors())

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log("db connected")}).catch((error)=>{console.log(error)})

seederData();

const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notification");


app.use("/api/users",userRoutes);
app.use("/api/notification",notificationRoutes);


app.listen(3000, () => console.log("server up and runing on port 3000!"));