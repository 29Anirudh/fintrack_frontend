import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const AllPeopleSearch = ({searchAll="",setSearchAll}) => {
  return (
    <div className='flex items-center gap-2 w-full focus-within:ring-1 p-3 border border-slate-700 focus-within:ring-violet-800 rounded-xl transition-all'>
      <FaSearch size={15} className='text-slate-500 opacity-55 w-[5%]'/>
      <input type='text' placeholder='Search by name or username...' value={searchAll} onChange={(e)=>setSearchAll(e.target.value)} className='focus:outline-none w-[90%] placeholder:text-slate-400 text-white text-sm bg-transparent'/>
      {searchAll.length>0 && <RxCross2 className='text-slate-500 opacity-85' onClick={()=>{setSearchAll("");}}/>}
    </div>
  )
}

export default AllPeopleSearch
