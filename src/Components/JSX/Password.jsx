import React, { useState } from 'react'
import { CiLock } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Password = ({userDetails,setUserDetails}) => {
    const [passwordToggle,setPasswordToggle]=useState(false)
  return (
     <div className={`flex flex-row w-full backdrop-blur-3xl border border-white/10 gap-1 bg-white/10 rounded-lg px-3 py-1 transition-all focus-within:border-violet-200 shadow-2xl }`}>
        <div className='p-3'><CiLock size={15} color='white'/></div>
        <input type={`${passwordToggle?'name':'password'}`} name="password" value={userDetails.password} placeholder='Password'  onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}  className='text-slate-300 text-sm flex-1 min-w-0 outline-none focus:placeholder-violet-300 transition-all duration-200 ease-out bg-transparent [&::-ms-reveal]:hidden'/>
        <div className='p-3'>{passwordToggle?<IoMdEye onClick={()=>setPasswordToggle(!passwordToggle)} color='grey'/>:<IoMdEyeOff onClick={()=>setPasswordToggle(!passwordToggle)} color='grey'/>}</div>
    </div>
  )
}

export default Password
