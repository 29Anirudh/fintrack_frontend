import React from 'react'
import { MdPersonSearch } from "react-icons/md";

const NoSearchValue = () => {
  return (
    <div className='h-36 text-sm text-slate-300 w-full flex flex-col items-center justify-center bg-transparent gap-2'>
      <div className='p-4 flex justify-center items-center bg-slate-600/10 backdrop-blur-xl rounded-full'><MdPersonSearch size={20}/></div>
      <span>Search for people to add as friends</span>
    </div>
  )
}

export default NoSearchValue
