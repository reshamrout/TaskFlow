import React from 'react'

const FeatureCard = ({title, icon, desc,}) => {
  return (
    <div className='flex flex-col w-[400px] bg-[#FFFFFF]  border-gray-400/40 border'>
        <div className='text-5xl px-4 mb-3 mt-5'>{icon}</div>
        <div className='pl-4 text-lg font-normal'>{title}</div>
        <div className='pl-4 text-sm mt-2 mb-10 text-[#717182]'>{desc}</div>
    </div>
  )
}

export default FeatureCard