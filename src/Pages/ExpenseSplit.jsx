import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Components/LoadingPage';
import EachExpenseCard from '../Components/ExpenseSplit/EachExpenseCard';

import { motion,AnimatePresence } from 'motion/react';

const ExpenseSplit = () => {
    const navigate=useNavigate();
    
    const [expenseSplitsDashboard,setExpenseSplitsDashboard]=useState(null);
    const [dashboardLoading,setDashboardLoading]=useState(true);

    const token=localStorage.getItem("token");
    async function getExpenseSplitsDashboard(){
        setDashboardLoading(true)
        try{
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/split/dashboard`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setExpenseSplitsDashboard(response.data);
        }
        catch(err){
            toast.error(err?.response?.data.msg||"Something went wrong");
            navigate("/")
        }
        finally{
            setDashboardLoading(false)
        }
    }

    useEffect(()=>{
        getExpenseSplitsDashboard();
    },[])
    if(dashboardLoading){
        return(<LoadingPage/>)
    }
    return (
        <div className='text-white mt-[70px] p-3 flex flex-col gap-5'>
            <motion.div initial={{opacity:0.5,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.15}} className='flex justify-between w-full'>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-lg'>Split Expenses</h1>
                    <span className='text-xs text-slate-300'>Track shared expenses.</span>
                </div>
                <button className='text-sm bg-violet-700 rounded-2xl px-4 hover:bg-violet-800'>+ Split Expense</button>
            </motion.div>
            <motion.div initial={{opacity:0.5,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.15}} className='flex w-full justify-between'>
                <div className='w-[48%] flex flex-col bg-gray-900 rounded-xl p-4 justify-center items-start'>
                    <span className='text-slate-400 text-xs'>THEY OWE YOU</span>
                    <span className='text-lg font-semibold text-green-500'>₹{expenseSplitsDashboard?.statistics?.credit}</span>
                </div>
                <div className='w-[48%] flex flex-col bg-gray-900 rounded-xl p-4 justify-center items-start'>
                    <span className='text-slate-400 text-xs'>YOU OWE</span>
                    <span className='text-lg font-semibold text-red-500'>₹{expenseSplitsDashboard?.statistics?.debit}</span>
                </div>
            </motion.div>

            <div className='w-full flex flex-col gap-3'>
                <AnimatePresence mode='popLayout'>
                    {expenseSplitsDashboard?.expenses.map((expense,index)=>(
                        <motion.div initial={{opacity:0.5,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.15}} key={index}>
                            <EachExpenseCard expense={expense} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
    }

export default ExpenseSplit
