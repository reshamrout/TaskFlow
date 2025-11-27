const Task = require('../models/Task');

exports.createTask = async (req, res) =>{
    try{

        const {title, description, status, dueDate, assignedTo } = req.body;
        const {accountType, userId} = req.user;

        if(!title || !description || !status){
            return res.status(400).json({
                success: false,
                message : "All fields are required",
            })
        }

        let finalAssignedTo = assignedTo;
        if(accountType === "User"){
            finalAssignedTo = userId;
        }
        
        const createdTask = await Task.create({
            title,
            description,
            status,
            dueDate,
            createdBy : userId,
            assignedTo : finalAssignedTo,
        })

        return res.status(200).json({
            success: true,
            task : createdTask,
            message : "Task created successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error creatig task",
        });
    }
}

exports.getAllTasks = async (req, res) => {
    try{
        const {accountType, userId} = req.user;
        let query = {};

        if(accountType === "User"){
            query = {assignedTo : userId};
        }

        const allTasks = await Task.find(query);

        return res.status(200).json({
            success: true,
            allTask : allTasks,
            message : "All Tasks fetched successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching all task",
        });
    }
}

exports.getTaskById = async (req, res) => {
    try{
        const {accountType, userId} = req.user;
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                succes: false,
                message: "Task Not Found",
            })
        }


        if(accountType === "User" && task.assignedTo.toString() !== userId){
            return res.status(403).json({
                success: false,
                message : "Forbidden, You are not authorized to view this task."
            })
        }

        return res.status(200).json({
            success: true,
            task : task,
            message : "Task fetched Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Fetching Task",
        });
    }
}

exports.updateTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const {accountType, userId} = req.user;
        const {title, description, status, dueDate, assignedTo} = req.body;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                succes: false,
                message: "Task Not Found",
            })
        }

        if(accountType === "User" && task.assignedTo.toString() !== userId ){
            return res.status(403).json({
                success: false,
                message: "Forbidden, You are not authorized to update this task",
            })
        }

        const updatedFields = {
            title : title || task.title,
            description: description || task.description,
            status : status || task.status,
            dueDate: dueDate || task.dueDate,
            updatedAt : Date.now(),
        }
        if(accountType === "Admin" && assignedTo){
            updatedFields.assignedTo = assignedTo;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {$set: updatedFields},
            {new : true},
        );
        return res.status(200).json({
            success: true,
            updatedTask : updatedTask,
            message : "Task Updated Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Updating Task",
        });
    }
}   

exports.deleteTask = async(req, res) => {
    try{
        const taskId = req.params.id;
        const {accountType, userId} = req.user;

        const task = await Task.findById(taskId);

        if(accountType === "User" && task.createdBy.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "Forbidden, You are not authorized to delete this task.",
            })
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            success: false,
            message: "Task Deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Deleting Task",
        });
    }
}