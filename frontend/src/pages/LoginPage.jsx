import React, { useContext } from 'react'
import {toast} from 'react-hot-toast'
import api from '../services/api'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginlogo from '../assets/login.svg'

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email : "",
        password : "",
    })
    const {email, password} = formData;

    const {login, logout} = useContext(UserContext)
    
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name] : e.target.value,
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await api.post("/auth/login", {email, password});
            login(response.data.user, response.data.token)
            toast.success("Login Successfull");
            navigate('/dashboard')
        }
        catch(error){
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message);
            }
            else {
                toast.error("Something went wrong. Try again!");
            }
        }   
    }
   

  return (
    <div className='w-screen h-screen bg-[#E8EFFF] flex justify-center items-center'>

    <form onSubmit={handleSubmit}>
        <div className=' bg-white min-w-md  overflow-hidden rounded-3xl'>
            <div className='flex flex-col gap-2 justify-center items-center mt-8'>
                <img src={loginlogo} className='w-20 h-20 object-cover'></img>
                <p className='font-semibold'>Welcome Back</p>
                <p className='text-[#717182] '>Sign in to your task management account</p>
            </div>
            <div className='mx-5 mt-7'>
                <label>
                <p className='mb-2'>Email</p>
                <input 
                    className='bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400'
                    required
                    type='text'
                    name = 'email'
                    value = {email}
                    onChange = {handleChange}
                    placeholder='Enter Email'
                    >
                </input>
            </label>
            <label>
                <p className='mt-3 mb-2'>Password</p>
                <input
                    className='bg-[#F3F3F5] p-2 w-full rounded-lg border-transparent outline-none border-2 focus:border-gray-400' 
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='Enter Password'
                    >
                </input>
            </label>
            </div>
            <div className='mx-5'>
                <button type='submit'
                className='bg-black w-full text-white px-4 py-2 rounded-lg my-3 cursor-pointer '
                >Sign in</button>
                <p className='text-center mb-5 text-[#717182]'>Don't have an account? 
                    <span className='text-blue-400 hover:underline cursor-pointer px-2'
                    onClick={()=>navigate("/signup")}
                    >Sign up</span>
                </p>
            </div>
        </div>

    </form>

    </div>
  )
}

export default LoginPage