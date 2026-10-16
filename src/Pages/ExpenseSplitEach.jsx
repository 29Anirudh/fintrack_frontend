import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingPage from '../Components/LoadingPage';

import { AnimatePresence,motion } from 'motion/react';
import EachUserPaymentCard from '../Components/ExpenseSplit/EachUserPaymentCard';
import Dropdown from '../Components/ExpenseSplit/Dropdown';
import Dropdown2 from '../Components/ExpenseSplit/Dropdown2';

import { MdOutlineEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { each } from 'chart.js/helpers';

const ExpenseSplitEach = () => {
    const {id}=useParams();
    const navigate=useNavigate();

    const [expenseDetails,setExpenseDetails]=useState(null)
    const [expenseSplitLoading,setExpenseSplitLoading]=useState(true);

    const[loadingItems,setLoadingItems]=useState(null)

    const [myUserPayment,setMyUserPayment]=useState(null);

    const [deleting,setDeleting]=useState(false)

    const [cardDetails,setCardDetails]=useState({
        methodName:"",
        cardOpen:false,
        eachUserPayment:null
    });

    const [confirmationBoxOpen,setConfirmationBoxOpen]=useState(false)

    const [cardDetails2,setCardDetails2]=useState({
        methodName:"",
        cardOpen:false,
        eachUserPayment:null
    })

    const splitMethods={
        markAsPaid,
        markAsReceived,
        rejectPayment,
        confirmPayment
    }
    const [paymentRecord,setPaymentRecord]=useState({
        personsUsername:"",
        amount:0,
        splitId:"",
        isThereATransaction:false,
        maskedAccountno:""
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

    function editEachUserPayment(eachUserPaymentId,newStatus){
        setExpenseDetails(prev=>({
            ...prev,
            eachUserPayments:prev.eachUserPayments?.map((eachUserPayment)=>eachUserPayment.id===eachUserPaymentId ? {...eachUserPayment,eachPaymentStatus:newStatus}:eachUserPayment)
        }))
        setMyUserPayment(prev => prev?.map(eachUserPayment => eachUserPayment.id === eachUserPaymentId ? { ...eachUserPayment, eachPaymentStatus: newStatus } : eachUserPayment ) );
    }

    async function markAsPaid(eachUserPaymentId,paymentRecord) {
        const updatedPaymentRecord={
            ...paymentRecord,
            splitId:id
        }
        setLoadingItems(
            {
                id:eachUserPaymentId,
                action:"MarkAsPaid"
            }
        )
        if(!checkPaymentRecord("MarkAsPaid",updatedPaymentRecord)){
            setLoadingItems(null)
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split/markaspaid`,updatedPaymentRecord,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(response?.data?.msg);
            editEachUserPayment(eachUserPaymentId,"AWAITING_CONFIRMATION")

        }catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong.")
        }
        finally{
            setLoadingItems(null)
            setCardDetails(null)
        }
    }

    async function markAsReceived(eachUserPaymentId,paymentRecord) {
        const updatedPaymentRecord={
            ...paymentRecord,
            splitId:id
        }
        setLoadingItems(
            {
                id:eachUserPaymentId,
                action:"MarkAsReceived"
            }
        )
        if(!checkPaymentRecord("MarkAsReceived",updatedPaymentRecord)){
            setLoadingItems(null)
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split/markasreceived`,updatedPaymentRecord,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(response?.data?.msg);
            editEachUserPayment(eachUserPaymentId,"PAID")

        }catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong.")
        }
        finally{
            setCardDetails(null)
            setLoadingItems(null)
        }
    }

    async function rejectPayment(eachUserPaymentId,paymentRecord){
        const updatedPaymentRecord={
            ...paymentRecord,
            splitId:id
        }
        setLoadingItems(
            {
                id:eachUserPaymentId,
                action:"RejectPayment"
            }
        )
        if(!checkPaymentRecord("RejectPayment",updatedPaymentRecord)){
            setLoadingItems(null)
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split/rejectpayment`,updatedPaymentRecord,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(response?.data?.msg);
            editEachUserPayment(eachUserPaymentId,"REJECTED")
        }catch(err){
            console.log(paymentRecord)
            toast.error(err?.response?.data.msg||"Something went wrong.")
        }
        finally{
            setCardDetails2(null)
            setLoadingItems(null)
        }
    }

    async function confirmPayment(eachUserPaymentId,paymentRecord){
        const updatedPaymentRecord={
            ...paymentRecord,
            splitId:id
        }
        setLoadingItems(
            {
                id:eachUserPaymentId,
                action:"ConfirmPayment"
            }
        )
        if(!checkPaymentRecord("ConfirmPayment",updatedPaymentRecord)){
            console.log(updatedPaymentRecord)
            setLoadingItems(null)
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split/confirmpayment`,updatedPaymentRecord,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(response?.data?.msg);
            editEachUserPayment(eachUserPaymentId,"PAID")
        }catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong.")
        }
        finally{
            setCardDetails2(null)
            setLoadingItems(null)
        }
    }

    function checkPaymentRecord(methodName,paymentRecord){
        console.log(paymentRecord)
        if(methodName!=="RejectPayment" && paymentRecord.maskedAccountno?.trim().length<=0){
            toast.error("Select any account.")
            return false;
        }
        if(paymentRecord.personsUsername?.trim().length===0 || paymentRecord.amount<=0 || paymentRecord.splitId?.trim().length===0){
            toast.error("Re-login once");
            navigate("/login")
            return false;
        }
        return true;
    }

    async function deleteSplit(){
        setDeleting(true);
        try{
            const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/split/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
            })
            toast.success(response?.data?.msg);
            navigate(-1);
        }catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong.")
        }
        finally{
            setDeleting(false);
        }
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
                {myUserPayment[0] && 
                <EachUserPaymentCard eachUserPayment={myUserPayment[0]}  cardDetails2={cardDetails2} setCardDetails2={setCardDetails2} loadingItems={loadingItems} isLoggedInUserOwner={isLoggedInUserOwner} splitMethods={splitMethods} cardDetails={cardDetails} setCardDetails={setCardDetails}/>
                }
            </motion.div>
            {expenseDetails?.eachUserPayments.map((eachUserPayment,index)=>(
                <motion.div initial={{opacity:0.6,y:20}} animate={{opacity:1,y:0}} className='bg-gray-900' key={index}>
                    {eachUserPayment.name!=="You" && <EachUserPaymentCard eachUserPayment={eachUserPayment} cardDetails2={cardDetails2} setCardDetails2={setCardDetails2} paymentRecord={paymentRecord} setPaymentRecord={setPaymentRecord} loadingItems={loadingItems} isLoggedInUserOwner={isLoggedInUserOwner} splitMethods={splitMethods} cardDetails={cardDetails} setCardDetails={setCardDetails}/> }
                </motion.div>
            ))}
        </div>
        {expenseDetails && expenseDetails.paidByName==="You" && (
            <motion.div initial={{opacity:0.5,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.15}}  className='flex justify-between items-center w-full'>
                <button className='bg-gray-600 rounded-xl p-3 w-[45%] flex gap-1 items-center justify-center' disabled={confirmationBoxOpen}><MdOutlineEdit/> Edit</button>
                <button className='bg-red-600/20 text-red-500 rounded-xl border-red-500/40 border p-3 w-[45%] flex gap-1 items-center justify-center' onClick={()=>setConfirmationBoxOpen(true)}><AiTwotoneDelete/> Delete</button>
            </motion.div>
        )}
        
        <AnimatePresence mode='popLayout'>
            {cardDetails && cardDetails.cardOpen &&(
                <motion.div initial={{opacity:0.5,scale:0.25}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.5}} transition={{duration:0.25}} className='fixed z-10 flex justify-center items-center -mt-[70px] h-full w-[90%]'>
                    <Dropdown paymentRecord={paymentRecord} setPaymentRecord={setPaymentRecord} cardDetails={cardDetails} setCardDetails={setCardDetails} loadingItems={loadingItems} splitMethods={splitMethods}/>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence mode='popLayout'>
            {cardDetails2 && cardDetails2.cardOpen &&(
                <motion.div initial={{opacity:0.5,scale:0.25}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.5}} transition={{duration:0.25}} className='fixed z-10 flex justify-center items-center -mt-[70px] h-full w-[90%]'>
                    <Dropdown2 paymentRecord={paymentRecord} setPaymentRecord={setPaymentRecord} cardDetails={cardDetails2} setCardDetails={setCardDetails2} loadingItems={loadingItems} splitMethods={splitMethods}/>
                </motion.div>
            )}
        </AnimatePresence>
        {/* Delete confirmation box */}
        <AnimatePresence mode='popLayout'>
            {confirmationBoxOpen &&(
                <motion.div initial={{opacity:0.5,scale:0.25}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.5}} transition={{duration:0.25}} className='fixed z-10 flex justify-center items-center -mt-[70px] h-full w-[90%]'>
                   <div className='flex flex-col bg-black/50 backdrop-blur-xl items-center justify-center gap-3 rounded-lg px-6 py-10 shadow-lg shadow-gray-500/30'>
                        <div className='rounded-full p-3 bg-red-600/30'>
                            <RiDeleteBin5Line size={25}/>
                        </div>
                        <h2 className='text-lg font-semibold'>Delete Expense ?</h2>
                        <span className='text-center w-full text-sm text-slate-400'>This will remove "{expenseDetails?.purpose}" and its corresponding transactions.</span>
                        <div className='flex justify-between items-center w-full'>
                            <button className='bg-gray-600 w-[45%] py-2 rounded-lg' disabled={deleting} onClick={()=>setConfirmationBoxOpen(false)}>Cancel</button>
                            <button className='bg-red-600 w-[45%] py-2 rounded-lg' disabled={deleting} onClick={deleteSplit}>{deleting ? "Deleting..." : "Delete"}</button>
                        </div>
                   </div>
                </motion.div>
            )}
        </AnimatePresence>
        
    </div>
  )
}

export default ExpenseSplitEach
