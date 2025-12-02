import React, { useContext, useState, useEffect } from "react"
import {IoClose} from 'react-icons/io5';
import { UserContext } from "../context/UserContext";
import {TiArrowSortedDown} from 'react-icons/ti'
import api from "../services/api";
import toast from "react-hot-toast";


const TaskForm = () =>{

    const initial_form = {
        title : "",
        description : "",
        status : "",
        assignedTo : "",
        dueDate : "",
    }
    const [formData, setFormData] = useState(initial_form);

    const [allUsers, setAllUsers] = useState(null);

    const {title, description, status, assignedTo, dueDate} = formData;

    const {user, token,showForm, setShowForm} = useContext(UserContext);

    const fetchAllUsers = async () =>{
        const users = await api.get("/auth/getAllUsers",{
            //headers: { Authorization: `Bearer ${token}` }
        });
        setAllUsers(users.data.users);
    }
    
    useEffect(()=>{
       if(user.accountType === "Admin") fetchAllUsers();
    },[]);

    useEffect(()=>{
        setFormData(initial_form);
    },[showForm])

    const handleChange = (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            console.log(title, description, status, assignedTo, dueDate);
            const response = await api.post("/task/createTask", {title, description, status, assignedTo, dueDate});
            toast.success("Task Created Successfully");
            setShowForm(false);
            setFormData(initial_form);
        }
        catch(error){
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message);
            }
            else{
                console.log(error);
                toast.error("Something went wrong!!");
            }
        }
    }


    return(
        <div>
        { showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
            <div className="min-w-[500px] bg-white p-5 rounded-lg">
                <div className="flex justify-between mb-3">
                    <div className=" font-bold">Create New Task</div>
                    <IoClose
                    className="text-lg cursor-pointer"
                    onClick={()=>setShowForm(false)}
                    ></IoClose>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-2">
                        <label>Title </label>
                        <input
                        required
                        className="bg-[#f3f3f5] p-2 rounded-lg border-transparent border-2 focus:border-gray-500 outline-none"
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="Enter Task Title"
                        >
                        </input>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <lable>Description</lable>
                        <textarea
                        required
                        className="bg-[#f3f3f5] p-2 rounded-lg border-transparent border-2 outline-none focus:border-gray-500"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Enter Task Description"
                        >
                        </textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col mt-3 gap-2 relative">
                            <label>Status</label>
                            <select
                            required
                            className="bg-[#f3f3f5] p-2 rounded-lg outline-none w-[200px] appearance-none"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <span className="pointer-events-none font-bold text-2xl absolute right-3 top-[53px] -translate-y-1/2"><TiArrowSortedDown/></span>
                        </div>
                        <div className="flex flex-col mt-3 gap-2">
                            <label>Assigned To</label>
                            <select
                            required
                            className="bg-[#f3f3f5] p-2 rounded-lg outline-none "
                            type="text"
                            name="assignedTo"
                            value={assignedTo}
                            onChange={handleChange}
                            >
                                <option value="" disabled>Select User</option>
                                {
                                    user.accountType === "Admin" && 
                                    allUsers.map((u)=>(
                                        <option key={u.id} value={u._id}>{u.email}</option>
                                    ))
                                }
                                {
                                    user.accountType === "User" && (
                                        <option value={user.id}>{user.email}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-2">
                          <label>Due Date</label>
                        <input
                        required
                        className="bg-[#f3f3f5] p-2 outline-none rounded-lg border-transparent border-2 focus:border-gray-500"
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={handleChange}
                        >
                        </input>
                    </div>
                    <div className="flex justify-end mt-7 gap-2 ">
                        <button
                            className="border border-gray-400/40 px-4 py-1 rounded-lg hover:bg-gray-300/50 transition-all duration-300 cursor-pointer"
                            onClick={()=>setShowForm(false)}
                            >
                            Cancel
                        </button>
                        <button
                            className=" text-white bg-black px-4 py-1 rounded-lg cursor-pointer"
                            >
                            Create Task
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )}
    </div>
    )
}

export default TaskForm