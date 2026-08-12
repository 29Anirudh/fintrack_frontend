import React from 'react'
import FullName from './FullName'
import EmailAddress from './EmailAddress'
import DateOfBirth from './DateOfBirth'
import Password from './Password'

const SignUpStepper = ({step,userDetails,setUserDetails}) => {
  return (
    <div className='w-[85%]'>
      {step.component}
    </div>
  )
}

export default SignUpStepper
