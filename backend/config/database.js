const mongoose  = require('mongoose');
require('dotenv').config();

const DbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log("Database connection failed", error);
    })
}

module.exports = DbConnect;