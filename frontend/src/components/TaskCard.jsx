import React, { useEffect, useState } from "react";
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import api from '../services/api'

const TaskCard = ({task}) => {

  const [moreDetails, setMoreDetails] = useState(false);
 

  return (
    <div>
      <div className="flex flex-col justify-between ml-10 mr-15 mt-5 bg-[#FFFFFF] py-5 px-8 rounded-lg border-gray-200 shadow hover:shadow-md">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 ">
              <div className="">{task.title}</div>
              <div
              className={`px-4 py-1 rounded-2xl text-white uppercase
                ${task.status === "Todo" && "bg-red-400"} 
                ${task.status === "In Progress" && "bg-orange-400"} 
                ${task.status === "Completed" && "bg-green-400"}
              `}
              >
                {task.status}
              </div>
            </div>
            <div className="text-[#717182]">{task.description}</div>
            <div className="flex flex-row gap-2 text-[#717182] justify-baseline items-center">
              <FaRegCalendarAlt />
              <p>Due:</p>
              {task.dueDate}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-4  text-xl">
              <div className="cursor-pointer"><FaEdit /></div>
              <div className="cursor-pointer"><MdDelete /></div>
            </div>
            <div className="">
              <button className="flex gap-2 justify-baseline items-center cursor-pointer hover:bg-[#eceff2] px-3 py-1 rounded-lg"
              onClick={()=>setMoreDetails(!moreDetails)}
              >
              {
                moreDetails === false ? 
                (
                    <>
                        <IoIosArrowDown />
                        <p>More</p>
                    </>
                )
                : 
                (
                    <>
                        <IoIosArrowUp />
                        <p>Less</p>
                    </>
                )
              }
              </button>
            </div>
          </div>
        </div>
        {/* More Details */}
        <div className={`mt-5 ${moreDetails === true ? "block" : "hidden"}`}>
            <div className="w-full h-px bg-gray-200 mb-5"></div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <IoPersonOutline/>
                    <p className="text-[#717182]">Created by: </p>
                    <p>{task.createdBy.firstname} {task.createdBy.lastname} </p>
                </div>
                <div className="flex gap-2 items-center">
                    <IoPersonOutline/>
                    <p className="text-[#717182]">Assigned to: </p>
                    <p>{task.assignedTo.firstname} {task.createdBy.lastname}</p>
                </div>
                <div className="flex gap-2 items-center ">
                    <IoTimeOutline/>
                    <p className="text-[#717182]">Created at: </p>
                    <p>{task.createdAt}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <IoTimeOutline/>
                    <p className="text-[#717182]">Updated at: </p>
                    <p>{task.updatedAt}</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TaskCard;
