import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBank } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

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
            icon:<GrTransaction size={20}/>,
            title:'Transactions',
            path:'/transactions'
        },
        {
            icon:<CgProfile size={20}/>,
            title:'Profile',
            path:'/profile'
        }
    ]
  return (
    <div className='fixed z-10 bottom-0 left-0 backdrop-blur-2xl flex gap-5 justify-around bg-white/10 rounded-t-xl w-full'>
        {footerElements.map((element,index)=>(
            <NavLink 
                to={element.path}
                key={index}
                className={({isActive})=>`flex flex-col items-center p-3 pl-7 pr-7 w-[20%] rounded-3xl ${isActive?'text-violet-500 bg-violet-500/10 ':'text-slate-400'}`}
            >
                {element.icon}
                <span className='text-xs font-semibold'>{element.title}</span>
            </NavLink>
        ))}
    </div>
  )
}

export default Footer
