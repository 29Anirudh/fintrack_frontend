import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
const EmailAddress = ({userDetails,setUserDetails}) => {
  return (
    <div className={`flex flex-row w-full backdrop-blur-3xl border border-white/10 gap-1 bg-white/10 rounded-lg px-3 py-1 transition-all focus-within:border-violet-200 shadow-2xl }`}>
        <div className='p-3'><MdOutlineEmail size={15} color='white'/></div>
        <input type='text' name="email" placeholder='Email' value={userDetails.email||""} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}  className='text-slate-300 w-full outline-none text-sm focus:placeholder-violet-300 transition-all duration-200 ease-out bg-transparent'/>
    </div>
  )
}

export default EmailAddress
