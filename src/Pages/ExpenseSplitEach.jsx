import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingPage from '../Components/LoadingPage';

import { AnimatePresence,motion } from 'motion/react';
import EachUserPaymentCard from '../Components/ExpenseSplit/EachUserPaymentCard';

const ExpenseSplitEach = () => {
    const {id}=useParams();
    const navigate=useNavigate();

    const [expenseDetails,setExpenseDetails]=useState(null)
    const [expenseSplitLoading,setExpenseSplitLoading]=useState(true);

    const[loadingItems,setLoadingItems]=useState(null)

    const [myUserPayment,setMyUserPayment]=useState(null);

    const [cardOpen,setCardOpen]=useState(false)

    const [paymentRecord,setPaymentRecord]=useState({
        personsUsername,
        amount,
        splitId,
        isThereATransaction,
        maskedAccountno
    });

    const [formattedDate,setFormattedDate]=useState(null)

    const token=localStorage.getItem("token")

    const [isLoggedInUserOwner,setIsLoggedInUserOwner]=useState(false)

    async function getExpenseSplitById(splitId){
        setExpenseSplitLoading(true)
        try{
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/split/${splitId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setExpenseDetails(response?.data?.details)
            const formattedDate=new Date(response?.data?.details?.dateOfExpense).toLocaleString("en-IN",{
                day:"2-digit",
                month:"short",
                year:"numeric"
            })
            setMyUserPayment(response?.data?.details?.eachUserPayments.filter((eachUserPayment)=>eachUserPayment.name==="You"))
            setIsLoggedInUserOwner(response?.data?.details?.eachUserPayments.find((eachUserPayment)=>eachUserPayment.name==="You"&&eachUserPayment.isOwner===true)?true:false)
            setFormattedDate(formattedDate)
        }
        catch(err){
            toast.error(err?.response?.data.msg||"Unable to fetch");
            navigate(-1)
        }
        finally{
            setExpenseSplitLoading(false)
        }
    }

    async function markAsPaid(eachUserPaymentId) {
        setPaymentRecord(prev=>({
            ...prev,
            splitId:expenseDetails.spltiId,
        }))
        setLoadingItems(
            {
                id:eachUserPaymentId,
                action:"MarkAsPaid"
            }
        )
        if(!checkPaymentRecord()){
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split/markaspaid`,paymentRecord,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(response?.data?.msg);
        }catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong.")
            setCardOpen(false)
        }
        finally{
            setLoadingItems(null)
        }
    }

    function checkPaymentRecord(){
        if(paymentRecord.maskedAccountno.trim().length===0){
            toast.error("Select any account.")
            return false;
        }
        if(paymentRecord.personsUsername.trim().length===0 || paymentRecord.amount<=0 || paymentRecord.splitId.trim().length===0){
            toast.error("Re-login once");
            navigate("/login")
            return false;
        }
        return true;
    }

    useEffect(()=>{
        getExpenseSplitById(id);
    },[])

    if(expenseSplitLoading){
        return(<LoadingPage/>)
    }
  return (
    <div className='mt-[70px] text-white flex flex-col p-4 gap-4'>
        <button className='flex gap-1 items-center text-sm text-slate-300' onClick={()=>navigate(-1)}>
            <GoArrowLeft/> Back
        </button>
        {/* Main Card  */}
        <motion.div initial={{opacity:0.5,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.15}} className='flex flex-col gap-6 w-full bg-gray-900 p-4 rounded-xl shadow-md shadow-white/10'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <span className='font-semibold'>{expenseDetails?.purpose}</span>
                    <span className='text-xs text-slate-400'>{formattedDate}</span>
                </div>
                <div className='flex flex-col text-xs justify-end items-end gap-2'>
                    <span className=' text-sky-400 bg-sky-700/30 border border-sky-700 rounded-lg px-2'>{expenseDetails?.splitStatus}</span>
                    <span className='text-sky-400 bg-sky-700/30 border border-sky-700 rounded-lg px-2 w-fit'>{expenseDetails?.splitMode}</span>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <span className='text-xs text-slate-400'>Total Amount</span>
                    <span className='text-xl font-semibold'>₹{expenseDetails?.amount}</span>
                </div>
                <div className='flex flex-col items-end'>
                    <span className='text-xs text-slate-400 opacity-75'>Paid By</span>
                    <span className='text-sm font-semibold'>{expenseDetails?.paidByName}</span>
                </div>
            </div>
        </motion.div>
        <div className='flex flex-col gap-2 '>
            <span className='text-slate-300 font-semibold'>PARTICIPANTS</span>
            <motion.div initial={{opacity:0.6,y:20}} animate={{opacity:1,y:0}} className='bg-gray-900'>
                <EachUserPaymentCard eachUserPayment={myUserPayment[0]} isLoggedInUserOwner={isLoggedInUserOwner} loadingItems={loadingItems} setPaymentRecord={setPaymentRecord} markAsPaid={markAsPaid} cardOpen={cardOpen} setCardOpen={setCardOpen}/>
            </motion.div>
            {expenseDetails?.eachUserPayments.map((eachUserPayment,index)=>(
                <motion.div initial={{opacity:0.6,y:20}} animate={{opacity:1,y:0}} className='bg-gray-900' key={index}>
                    {eachUserPayment.name!=="You" && <EachUserPaymentCard eachUserPayment={eachUserPayment} loadingItems={loadingItems} isLoggedInUserOwner={isLoggedInUserOwner} setPaymentRecord={setPaymentRecord} markAsPaid={markAsPaid} cardOpen={cardOpen} setCardOpen={setCardOpen}/> }
                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default ExpenseSplitEach
