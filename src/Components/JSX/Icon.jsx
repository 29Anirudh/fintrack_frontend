import React from 'react'
import main_icon from "../../../public/icon_img.png"
const Icon = () => {
  return (
    <div className='flex gap-1 items-center justify-center'>
        <img src={main_icon} alt='' className='w-16'/>
        <h1 className='text-2xl w-full text-center text-slate-50 font-semibold'>
            Fin<span className='text-blue-500'>Track</span>
        </h1>
        
    </div>
  )
}

export default Icon
