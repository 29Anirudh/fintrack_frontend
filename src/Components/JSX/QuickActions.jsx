import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoIosWallet } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate=useNavigate()
    const quickActions=[
        {
            icon:<CiCirclePlus size={30}/>,
            title:"New Account",
            subTitle:"Link a bank account",
            to:"/accounts"
        },
        {
            icon:<AiOutlineTransaction size={30}/>,
            title:"New Transaction",
            subTitle:"Record Payments",
            to:"/transactions/add"
        },
        {
            icon:<IoIosWallet size={30}/>,
            title:"My Accounts",
            subTitle:"View all accounts",
            to:"/accounts"
        },

    ]
  return (
    <div className='flex gap-2 w-full p-2'>
      {quickActions.map((action,index)=>(
        <div key={index} onClick={()=>navigate(action.to)} className='flex flex-col border h-32 border-slate-600 rounded-3xl items-center justify-center w-[40%] p-2 hover:-translate-y-1 transition-all'>
            <button className='rounded-full p-3 bg-gradient-to-b from-blue-600 to-purple-700'>{action.icon}</button>
            <p className='text-sm text-center font-semibold'>{action.title}</p>
            <p className='text-xs text-slate-400 text-center'>{action.subTitle}</p>
        </div>
      ))}
    </div>
  )
}

export default QuickActions
