import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AccountDetailsCardMain from '../../Components/JSX/AccountDetailsCardMain';
import BankInfoCard from '../../Components/JSX/BankInfoCard';
import { IoIosKey } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import TransactionCard from '../../Components/JSX/TransactionCard';
import { FaPlus } from 'react-icons/fa';
import LoadingPage from '../../Components/LoadingPage';

import { AnimatePresence, motion } from "framer-motion";

const EachAccountPage = () => {
  function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
    const {id}=useParams();
    const [accountDetails,setAccountDetails]=useState(null);
    const [transactionDetails,setTransactionDetails]=useState(null);
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      setLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/dashboardinfo/${id}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }).then((res)=>{
          setAccountDetails(res.data.account);
          setTransactionDetails(res.data.transactions);
        }).catch((err)=>console.error(err.response.data.msg)).finally(()=>setLoading(false))
    },[])

    const infoDetails=[
      {
        title:"ACCOUNT",
        value:accountDetails?.accountType ?? ""
      },
      {
        title:"CREATED",
        value:formatDate(accountDetails?.createdAt)
      }
    ]
    if(loading){
      return(<LoadingPage/>)
    }
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mt-[70px] pb-[100px] flex flex-col w-full gap-5 text-gray-200 justify-center items-center relative'>

        {accountDetails&&<AccountDetailsCardMain account={accountDetails}/>}
        <div className='flex justify-around w-full'>
          {infoDetails.map((detail,index)=>(
            <BankInfoCard detail={detail} key={index}/>
          )) }
        </div>
        <div className='flex justify-around gap-2 w-[95%] font-semibold'>
          <button className='w-[45%] bg-white/15 rounded-lg p-2 flex justify-center items-center gap-2 hover:scale-[1.02] transition-all'><IoIosKey/>Reset Pin</button>
          <button className='w-[45%] bg-blue-900 rounded-lg p-2 flex justify-center items-center gap-2 hover:scale-[1.02] transition-all'>View Transactions</button>
        </div>
        {(transactionDetails && transactionDetails.length>0 )?
        (
          <div className='flex flex-col w-[95%] p-2 gap-3'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold'>
                Recent Activity
              </h2>
              <span className='opacity-50 text-sm'>{transactionDetails.length} transactions</span>
            </div>
            {transactionDetails.map((transaction,index)=>(
              <TransactionCard transaction={transaction} key={index}/>
            ))}
          </div>
        ):(
          <div className='flex flex-col justify-center items-center gap-2 w-[95%] p-5 bg-white/10 rounded-xl'>
            <h2 className='font-semibold text-lg'>No Transactions Yet</h2>  
          <span className='opacity-50 text-sm'>You haven't made any transactions yet. Start by making a deposit or transfer to see your activity here.</span>
          </div>
        )
        
        }
        <div className='p-4 rounded-full absolute bottom-10 right-5 shadow-lg shadow-blue-500/20 bg-blue-900 hover:scale-[1.05] transition-all cursor-pointer' onClick={()=>navigate('/transactions/add')}>
          <FaPlus size={25}/>
        </div>
        
    </motion.div>
  )
}

export default EachAccountPage
