import React from 'react'
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';

const Search = ({searchValue,setSearchValue}) => {
  return (
    <div className='flex gap-2 w-full focus-within:ring-1 focus-within:ring-violet-600 items-center p-2 border rounded-xl border-slate-800 transition-all'>
      <FaSearch size={15} className='text-blue-900'/>
      <input type='text' placeholder='Search friends' value={searchValue} className='focus:outline-none w-full bg-transparent placeholder:text-slate-500 text-white' onChange={(e)=>{setSearchValue(e.target.value)}} />
      {searchValue.length>0 && <RxCross2 className='text-slate-500 opacity-85' onClick={()=>{setSearchValue("");}}/>}
    </div>
  )
}

export default Search
