import React from 'react'

const BankInfoCard = ({detail,index}) => {
  return (
    <div className='flex flex-col w-[40%] text-white bg-white/5 p-5 rounded-2xl' index={index}>
      <span className='text-xs opacity-50'>{detail.title}</span>
      <span className='font-semibold'>{detail.value}</span>
    </div>
  )
}

export default BankInfoCard
