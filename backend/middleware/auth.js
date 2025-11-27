const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) =>{
    try{
        const token = req.cookies.token ||
                      req.body.token ||
                      req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            })
        }
        try{
            const decode = jwt.decode(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                success: false,
                message : "Invalid Token",
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message : "Something went wrong while validating the token",
        })
    }
}


exports.isAdmin = (req, res, next) => {
    try{

        const {accountType} = req.user;

        if(accountType !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Admin only."
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while validating Admin"
        })
    }
}