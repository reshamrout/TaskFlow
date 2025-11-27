
const User = require('../models/User')


exports.getAllUsers = async(req, res) => {
    try{
        const {accountType} = req.user;
        const users = await User.find();

        // this is a protected route so no need to validate accountType here.
        return res.status(200).json({
            success: true,
            users: users,
            message: "All users fetched successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Error fetching all users",
        })
    }
}