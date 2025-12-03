import React, { useContext, useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import {UserContext} from '../context/UserContext'
import api from '../services/api'

const Dashboard = () => {

    const tabs = ["All", "Todo", "In Progress", "Completed"];
    const [selected, setSelected] = useState("All");
    const {setShowForm} = useContext(UserContext);
    const [allTasks, setAllTasks] = useState(null);

    const fetchAllTasks = async() =>{
        const response = await api.get("/task/getAllTasks");
        setAllTasks(response.data.allTask);
    }

    useEffect(()=>{
        fetchAllTasks();
    },[])

    const filteredTasks = selected === "All" ? allTasks : allTasks.filter((task)=>task.status === selected);

  return (
    <div className='w-screen h-screen bg-[#F9FAFB] pt-20'>
        <div className='grid grid-cols-1 *:w-90 *:h-30 *:p-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 m-10 *:bg-[#FFFFFF] *:rounded-2xl *:border-gray-200 *:shadow' >
            <div className=' flex flex-col p-5 rounded-2xl h-[100px] gap-2'>
                <p>Total Tasks</p>
                <p className='text-2xl text-blue-500'>{allTasks ? allTasks.length : "NA"}</p>
            </div>
            <div className='flex flex-col p-5 gap-2'>
                <p>Todo</p>
                <p className='text-2xl text-red-500'>{allTasks ? allTasks.filter((task)=>task.status === "Todo").length : "NA"}</p>
            </div>
            <div className='flex flex-col p-5 gap-2'>
                <p>In Progress</p>
                <p className='text-2xl text-yellow-600'>{allTasks ? allTasks.filter((task)=>task.status === "In Progress").length : "NA"}</p>
            </div>
            <div className='flex flex-col p-5 gap-2'>
                <p>Completed</p>
                <p className='text-2xl text-green-600'>{allTasks ? allTasks.filter((task)=>task.status === "Completed").length : "NA"}</p>
            </div>
        </div>
        <div className='flex justify-between items-center ml-10 mr-15'>
            <div className='flex gap-5'>
                {
                    tabs.map((tab)=>(
                        <button
                        key={tab}
                        onClick={()=>setSelected(tab)}
                        className={` px-4 py-2 rounded-lg
                            ${selected === tab ? "bg-black text-white" : "text-black bg-[#FFFFFF] hover:bg-[#F5F5F5] cursor-pointer"}
                        `}
                        >
                        {tab}
                        </button>
                    ))
                }
                
            </div>

            <div>
                <button 
                className='flex gap-3 px-4 py-2 rounded-lg bg-black text-white hover:cursor-pointer'
                onClick={()=>setShowForm(true)}
                >
                    <p>+</p>
                    <p>New Task</p>
                </button>
            </div>
        </div>

        {/* Task Card */}
        <div className='mt-10'>
                {
                    filteredTasks ? (filteredTasks.map((task)=>(<TaskCard key={task.id} task={task} onSuccess={fetchAllTasks}/>))) : (<p>No Tasks</p>)
                    
                }
        </div>
        <div>
            <TaskForm onSuccess={fetchAllTasks}/>
        </div>

    </div>
  )
}

export default Dashboard