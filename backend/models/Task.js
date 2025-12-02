const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        require : true,
        trim : true,
    },
    description : {
        type : String,
        require : true,
    },
    status : {
        type : String,
        enum : ["Todo", "In Progress", "Completed"],
        default : "Pending",
    },
    dueDate :{
        type : Date,
        default : () => Date.now() + 2 * 24 * 60 * 60 * 1000,
    },
    createdBy:{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true,
    },
    assignedTo :{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        require : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    updatedAt : {
        type: Date,
    }
})

module.exports = mongoose.model("task", TaskSchema);