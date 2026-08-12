import React from 'react'

const SignUpStepLines = ({currentStep}) => {
  return (
    <div className='w-full flex justify-center'>
        <div className='flex gap-2 justify-center w-[85%] '>
            {
                Array.from({length:4}).map((_,id)=>(
                    <div key={id} className={`h-1 rounded-lg w-full ${id<currentStep?'bg-violet-400':'bg-slate-200'}`}>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SignUpStepLines
