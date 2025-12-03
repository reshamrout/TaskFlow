import React, { useContext, useState, useEffect } from "react"
import {IoClose} from 'react-icons/io5';
import { UserContext } from "../context/UserContext";
import {TiArrowSortedDown} from 'react-icons/ti'
import api from "../services/api";
import toast from "react-hot-toast";



const TaskEditPage = ({task, onClose, onSuccess}) =>{

    const dateStr = new Date(task.dueDate).toISOString().split("T")[0];
    const initial_form = {
            title : task.title || "",
            description : task.description || "",
            status : task.status || "",
            assignedTo : task.assignedTo || "",
            dueDate : dateStr || "",
        }
    const [formData, setFormData] = useState(initial_form);
    const {title, description, status, assignedTo, dueDate} = formData;

    const [allUsers, setAllUsers] = useState([]);
    const {user} = useContext(UserContext);

    const fetchAllUsers = async () =>{
        const users = await api.get("/auth/getAllUsers");
        setAllUsers(users.data.users);
    }
    
    useEffect(()=>{
       if(user.accountType === "Admin") fetchAllUsers();
    },[]);

    const handleChange = (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async(e) =>{
         try{
            e.preventDefault();
            const response = await api.put(`/task/${task._id}`, {title, description, status, assignedTo, dueDate});
            toast.success("Task Updated Successfully");
            if(onSuccess) onSuccess();
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
      <div className="min-w-[500px] bg-white p-5 rounded-lg">
        <div className="flex justify-between mb-3">
          <div className="font-bold">Edit Task</div>
          <IoClose className="text-lg cursor-pointer" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              required
              name="title"
              value={title}
              onChange={handleChange}
              className="bg-[#f3f3f5] p-2 rounded-lg border-transparent border-2 focus:border-gray-500 outline-none"
              type="text"
              placeholder="Enter Task Title"
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label>Description</label>
            <textarea
              required
              name="description"
              value={description}
              onChange={handleChange}
              className="bg-[#f3f3f5] p-2 rounded-lg border-transparent border-2 outline-none focus:border-gray-500"
              placeholder="Enter Task Description"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col mt-3 gap-2 relative">
              <label>Status</label>
              <select
                required
                name="status"
                value={status}
                onChange={handleChange}
                className="bg-[#f3f3f5] p-2 rounded-lg outline-none w-[200px] appearance-none"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <span className="pointer-events-none font-bold text-2xl absolute right-3 top-[53px] -translate-y-1/2">
                <TiArrowSortedDown />
              </span>
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <label>Assigned To</label>
              <select
                required
                name="assignedTo"
                value={assignedTo}
                onChange={handleChange}
                className="bg-[#f3f3f5] p-2 rounded-lg outline-none"
              >
                <option value="" disabled>
                  Select User
                </option>

                {user?.accountType === "Admin" &&
                  allUsers.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.email}
                    </option>
                  ))}

                {user?.accountType === "User" && (
                  <option value={user.id || user._id}>{user.email}</option>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-col mt-3 gap-2">
            <label>Due Date</label>
            <input
              required
              name="dueDate"
              value={dueDate}
              onChange={handleChange}
              className="bg-[#f3f3f5] p-2 outline-none rounded-lg border-transparent border-2 focus:border-gray-500"
              type="date"
            />
          </div>

          <div className="flex justify-end mt-7 gap-2 ">
            <button
              className="border border-gray-400/40 px-4 py-1 rounded-lg hover:bg-gray-300/50 transition-all duration-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="text-white bg-black px-4 py-1 rounded-lg cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default TaskEditPage