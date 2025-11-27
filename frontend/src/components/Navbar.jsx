import {SiGoogletasks} from 'react-icons/si'
import {IoIosLogOut} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Navbar = () =>{

    const navigate = useNavigate();

    const [login, setLogin] = useState(true);

    return(
        <div>
        
            <div className='w-full flex justify-between bg-[#ffffff]'>
                {login === false ? 
                (
                    <>
                        <div className='flex gap-3 ml-10 my-3  justify-baseline items-center '
                            onClick={()=>navigate("/")}
                        >
                            <SiGoogletasks
                            className='text-5xl text-blue-600 '
                            />
                            <p
                            className='text-3xl text-blue-600'
                            >
                            TaskFlow
                            </p>
                        </div>
                        <div className='flex justify-center items-center mr-10 gap-3'>
                            <button
                            className='hover:bg-gray-400/30 px-4 py-1 rounded-lg transition-all duration-300 cursor-pointer'
                            onClick={()=>navigate("/login")}
                            >
                            Sign in
                            </button>
                            <button
                            className='text-white  bg-black px-4 py-1 rounded-lg cursor-pointer'
                            onClick={()=>navigate("/signup")}
                            >
                            Get Started
                            </button>
                    </div>
                    </>
               
                ) 
                : 
                (
                    <>
                        <div className='flex flex-col ml-10 my-3 '>
                            <p className='text-[#4F39F6] text-lg font-semibold'>Task Manager</p>
                            <p className='text-[#787888] font-medium'>Welcome Back, Resham</p>
                        </div>
                        <div className='flex justify-center items-center mr-10 '>
                            <button
                            className='flex gap-3 px-4 py-1  rounded-lg justify-baseline items-center border-gray-300 border hover:bg-gray-200 transition-all duration-300 cursor-pointer'
                            >
                            <IoIosLogOut/>
                                Logout
                            </button>
                        </div>
                    </>
                )}
             </div>
        
        </div>
    );
};


export default Navbar;