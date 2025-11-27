const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstname : {
            type : String,
            require : true,
            trim : true,
        },
        lastname : {
            type : String,
            require : true,
            trim : true,
        },
        email : {
            type : String,
            require : true,
        },
        password : {
            type : String,
            require : true,
        },
        accountType : {
            type : String,
            require : true,
            enum : ["Admin", "User"],
        },
        token : {
            type : String,
        }
    }
)

module.exports = mongoose.model("user", UserSchema);