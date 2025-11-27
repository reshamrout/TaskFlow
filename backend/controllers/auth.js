const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {

    try{
        const {firstname, lastname, email, password, cnfPassword, accountType} = req.body;
        if(!firstname || !lastname || !email || !password || !cnfPassword || !accountType){
            return res.status(403).json({
                success : false,
                message : "All fields are required",
            })
        }

        if( password != cnfPassword) {
            return res.status(400).json({
                success: false,
                message : "Password and Confirm Password does not match",
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message : "User already exist",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password : hashedPassword,
            accountType : accountType,
        })

        return res.status(200).json({
            success : true,
            message : "User registered successfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error while registering user",
        })
    }
}

exports.login = async (req, res) => {
    try{

        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "All fields are requried.",
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const token =  jwt.sign(
                {email : user.email, userId: user._id, accountType : user.accountType},
                process.env.JWT_SECRET,
                {expiresIn: 24 * 60 * 60 * 1000} // 24 hours   
            )
            user.token = token;
            user.password = undefined;
            const options = {
                expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly : true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token : token,
                user, 
                message : "User Logged In Successfully",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while Login. Please try again."
        })
    }
}

