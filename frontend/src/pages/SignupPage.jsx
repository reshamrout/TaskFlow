import React, { useEffect, useState } from "react";
import signuplogo from "../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {toast} from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cnfPassword: "",
    accountType: "",
  });

  const { firstname, lastname, email, password, cnfPassword, accountType } = formData;

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) =>{
    try{
      e.preventDefault();
      const response = await api.post("/auth/signup", {firstname, lastname, email, password, cnfPassword, accountType});
      toast.success("User Registered Successfully, Please Login!");
      navigate("/login");
    }
    catch(error){
      if(error.response && error.response.data.message){
        toast.error(error.response.data.message);
      }
      else{
        console.log(error);
         toast.error("Something went wrong. Try again!");
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-[#E8EFFF] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-white min-w-md  overflow-hidden rounded-3xl  border-gray-400/40 border shadow-lg">
          <div className="mx-5 mt-7 flex flex-col gap-2">
            <div className="flex flex-col gap-2 justify-center items-center mt-8 mb-5">
              <img src={signuplogo} className="w-20 h-20 object-cover"></img>
              <p className="font-semibold">Create Account</p>
              <p className="text-[#717182] ">
                Sign up to start managing your tasks
              </p>
            </div>

            <div className="w-full ">
              <p className="text-center"></p>
              <div className="flex bg-gray-200 rounded-full overflow-hidden w-52 mx-auto">
                <button
                  type="button"
                  className={`flex-1 py-2 text-center transition-all duration-500 ${
                    accountType === "User"
                      ? "bg-indigo-600 flex-2 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, accountType: "User" })
                  }
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, accountType: "Admin" })
                  }
                  className={`flex-1 py-2 text-center transition-all duration-500 ${
                    accountType === "Admin"
                      ? "bg-indigo-600 flex-2 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-5 ">
              <label className="">
              <p>First Name</p>
              <input
                className="bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400"
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                placeholder="Enter First Name"
              ></input>
            </label>

            <label>
              <p>Last Name</p>
              <input
                className="bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400"
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleChange}
                placeholder="Enter Last Name"
              ></input>
            </label>
            </div>

            <label>
              <p>Email</p>
              <input
                className="bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter Email"
              ></input>
            </label>

            <label>
              <p>Password</p>
              <input
                className="bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter Password"
              ></input>
            </label>

            <label>
              <p>Confirm Password</p>
              <input
                className="bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400"
                type="password"
                name="cnfPassword"
                value={cnfPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
              ></input>
            </label>
          </div>
          <div className='mx-5 my-1'>
                <button 
                type='submit'
                className='bg-black w-full text-white px-4 py-2 rounded-lg my-3 cursor-pointer '
                >Create Account</button>
                <p className='text-center mb-5 text-[#717182]'>Already have an account?? 
                    <span className='text-blue-400 hover:underline cursor-pointer px-2'
                    onClick={()=>navigate("/login")}
                    >Sign in</span>
                </p>
            </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
