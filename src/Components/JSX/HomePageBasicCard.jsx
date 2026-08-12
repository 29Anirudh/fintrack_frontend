import React from 'react'
import {useCountUp} from 'react-countup'

const HomePageBasicCard = ({id,icon,text,number}) => {
  useCountUp({
    ref:`counter${id}`,
    end:number,
    duration:1
  })
  return (
    <div className='bg-slate-900/55 border border-slate-800 flex gap-2 w-full rounded-xl'>
      <div className='w-[20%]'><img src={icon} className='p-3 rounded-full opacity-90' /></div>
      <div className='flex flex-col items-start justify-center'>
        <span className='text-sm text-gray-400'>{text}</span>
        <span id={`counter${id}`} className='text-xl font-semibold'/>
      </div>
      
    </div>
  )
}

export default HomePageBasicCard
