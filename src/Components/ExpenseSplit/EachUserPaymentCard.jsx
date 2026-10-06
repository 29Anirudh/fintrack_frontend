import React from 'react'

const EachUserPaymentCard = ({eachUserPayment}) => {
  return (
    <div className='bg-gray-900 flex flex-col'>
      <div className='flex'>
            <span>{eachUserPayment?.name}</span>
      </div>
    </div>
  )
}

export default EachUserPaymentCard
