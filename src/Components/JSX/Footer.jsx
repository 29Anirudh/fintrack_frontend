import React, { useState } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBank } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa";
import { LuSplit } from "react-icons/lu";

const Footer = () => {
    const footerElements=[
        {
            icon:<LuLayoutDashboard size={20}/>,
            title:'Home',
            path:'/'
        },
        {
            icon:<BsBank size={20}/>,
            title:'Accounts',
            path:'/accounts'
        },
        {
            icon:<FaUserFriends size={20}/>,
            title:'Friends',
            path:'/friends'
        },
        {
            icon:<LuSplit size={20}/>,
            title:'Split',
            path:'/splits'
        },
        {
            icon:<GrTransaction size={20}/>,
            title:'Expenses',
            path:'/transactions'
        }
    ]
  return (
    <div className='fixed z-10 bottom-0 left-0 backdrop-blur-2xl flex justify-around bg-white/10 rounded-t-xl w-full px-2'>
        {footerElements.map((element,index)=>(
            <NavLink 
                to={element.path}
                key={index}

                className={({isActive})=>`flex flex-col items-center p-2 rounded-3xl ${isActive?'text-violet-500 ':'text-slate-400'}`}
            >
                {({isActive})=>(
                    <>
                        <div className={`p-2 ${isActive ? 'bg-violet-700/20' : 'bg-transparent'} rounded-xl`}>{element.icon}</div>
                        <span className='text-xs font-semibold'>{element.title}</span>
                    </>
                )}
                
            </NavLink>
        ))}
    </div>
  )
}

export default Footer
