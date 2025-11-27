import React, { useContext, useState } from "react"
import {IoClose} from 'react-icons/io5';
import { UserContext } from "../context/UserContext";
import {TiArrowSortedDown} from 'react-icons/ti'


const TaskForm = () =>{

    const [formData, setFormData] = useState({
        title : "",
        description : "",
        status : "",
        assignedTo : "",
        dueDate : "",
    });

    const {title, description, status, assignedTo, dueDate} = formData;

    const handleChange = (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = () =>{

    }

    const {showForm, setShowForm} = useContext(UserContext)

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
                <form>
                    <div className=" flex flex-col gap-2">
                        <label>Title </label>
                        <input
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
                            className="bg-[#f3f3f5] p-2 rounded-lg outline-none w-[200px] appearance-none"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <span className="pointer-events-none font-bold text-2xl absolute right-3 top-[53px] -translate-y-1/2"><TiArrowSortedDown/></span>
                        </div>
                        <div className="flex flex-col mt-3 gap-2">
                            <label>Assigned To</label>
                            <input
                            className="bg-[#f3f3f5] p-2 rounded-lg outline-none "
                            type="text"
                            name="assignedTo"
                            value={assignedTo}
                            onChange={handleChange}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-2">
                          <label>Due Date</label>
                        <input
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
                            onClick={handleSubmit}
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