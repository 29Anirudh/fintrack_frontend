import React from 'react'
import { RiUserUnfollowFill } from "react-icons/ri";
const NoUsersFound = () => {
  return (
    <div className='flex flex-col min-h-36 justify-center items-center gap-1'>
        <div className='bg-black/10 rounded-full p-4'>
            <RiUserUnfollowFill size={20} className='opacity-65'/>
        </div>
        <span className='text-sm text-slate-200'>No users found</span>
        <span className='text-slate-400 text-xs'>Try a different name or username</span>
    </div>
  )
}

export default NoUsersFound
