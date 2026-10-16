import { number } from 'motion'
import React from 'react'

const Stepper1 = ({splitRecord,setSplitRecord,setError}) => {
    console.log(splitRecord)
    const today=new Date()
   const formattedToday = today.toISOString().split("T")[0];
  return (
    <div className='flex flex-col gap-2 py-3'>
        <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold text-slate-300'>Description</span>
            <input 
                type='text' 
                placeholder='e.g. Dinner' 
                className='rounded-xl py-2 bg-slate-900 border border-slate-500/40 p-2 placeholder:text-sm outline-none focus:ring-1 focus:ring-violet-300 transition-all'
                value={splitRecord?.purpose}
                onChange={(e)=>{
                    setError(null)
                    setSplitRecord(prev=>({
                        ...prev,
                        purpose:e.target.value
                    })   
                )}}
            />
        </div>
        <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold text-slate-300'>Amount</span>
            <div className=' flex gap-1 rounded-xl py-2 bg-slate-900 border border-slate-500/40 p-2 focus-within:ring-1 focus-within:ring-violet-300 transition-all'>
                <span>₹</span>
                <input 
                    type='text' 
                    placeholder='0.00' 
                    inputMode='decimal'
                    className='placeholder:text-sm outline-none w-full bg-transparent'
                    value={splitRecord?.amount}
                    onChange={(e)=>{
                        setError(null)
                        setSplitRecord(prev=>({
                            ...prev,
                            amount: e.target.value
                        })   
                    )}}
                />
            </div>
        </div>

        <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold text-slate-300'>Description</span>
            <input 
                type='date' 
                placeholder='e.g. Dinner' 
                className='rounded-xl py-2 bg-slate-900 border border-slate-500/40 p-2 placeholder:text-sm outline-none focus:ring-1 focus:ring-violet-300 transition-all'
                value={splitRecord?.dateOfExpense||""}
                max={formattedToday}
                onChange={(e)=>{
                    setError(null)
                    setSplitRecord(prev=>({
                        ...prev,
                        dateOfExpense:e.target.value
                    })   
                )}}
            />
        </div>
        <div className='flex flex-col'>
            <span className='text-xs font-semibold text-slate-300'>Paid By</span>
            <span className='text-lg font-semibold px-2'>You</span>
        </div>
    </div>
  )
}

export default Stepper1
