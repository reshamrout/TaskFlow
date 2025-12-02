const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const DbConnect = require("./config/database");
const taskRoutes = require("./routes/Task");
const userRoutes = require("./routes/User");

const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4000

DbConnect();

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/auth", userRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success: true,
        message : "Server is up and running",
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})
