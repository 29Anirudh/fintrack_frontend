import React from 'react'
import Icon from './Icon'

const Header = ({username}) => {
  return (
    <div className='flex flex-row h-[70px] justify-between w-full backdrop-blur-2xl bg-white/25 p-4 rounded-md text-slate-200 fixed top-0 z-10'>
        <Icon/>
        {username.length!==0 && (
            <div className='flex items-center gap-1  font-semibold'>
                <span className=''>Welcome, </span>
                <span className='text-blue-200'> {username}</span>
            </div>
        )}
    </div>
  )
}

export default Header
