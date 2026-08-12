import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";

const FullName = ({userDetails,setUserDetails}) => {
    const [focus,setFocus]=useState(0);
  return (
    <div className={`flex flex-row backdrop-blur-3xl border gap-1 bg-white/10 shadow-md rounded-lg px-3 py-1 transition-all ${focus===1 ? 'border-violet-200 shadow-2xl':"border-white/10"}`}>
        <div className='p-3'><FaRegUser size={15} color='white'/></div>
        <input type='text' name="fullname" value={userDetails.name} placeholder='Full Name' onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})} onFocus={()=>setFocus(1)} onBlur={()=>setFocus(0)} className=' w-full text-slate-300 text-sm outline-none focus:placeholder-violet-300 transition-all duration-200 ease-out bg-transparent'/>
    </div>
  )
}

export default FullName
