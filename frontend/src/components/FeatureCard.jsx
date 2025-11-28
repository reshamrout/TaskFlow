import React from 'react'
import image from '../assets/hometask.png'

const FeatureCard = ({title, description,}) => {
  return (
    <div className='flex flex-col w-[400px] h-[200px] justify-center items-center bg-[#FFFFFF] rounded-2xl hover:scale-105 transition-all duration-300  border-gray-400/40 border'>
        <img src={image} width={100} heigh={100} className='mt-12'></img>
        <div className=' text-lg font-normal mt-3'>{title}</div>
        <div className='p-5 text-sm mb-10 text-[#717182] text-justify'>{description}</div>
    </div>
  )
}

export default FeatureCard