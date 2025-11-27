import React, { useContext } from 'react'
import {toast} from 'react-hot-toast'
import api from '../services/api'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>

    <form onSubmit={handleSubmit}>
        <div>
            <label>
                <p>Email</p>
                <input 
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
                <p>Password</p>
                <input 
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='Enter Password'
                    >
                </input>
            </label>
            <button type='submit'>Login In</button>
        </div>

    </form>

    </div>
  )
}

export default LoginPage