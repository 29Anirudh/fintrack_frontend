import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence,motion } from 'motion/react'
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import Stepper1 from '../Components/ExpenseSplit/Stepper1';
import Stepper3 from '../Components/ExpenseSplit/Stepper3';
import Stepper2 from '../Components/ExpenseSplit/Stepper2';
import { RiGhost2Fill } from 'react-icons/ri';
import { BiRightArrow } from 'react-icons/bi';

const ExpenseSplitNew = ({update=0}) => {
    const navigate=useNavigate();
    const [splitRecord,setSplitRecord]=useState({
        purpose:"",
        numberOfPeople:0,
        eachUserPayments:[],
        maskedAccountNoForTransaction:"",
        mode:"",
        dateOfExpense:null,
        ownerUsername:"",
        amount:"",
        isTransactionThere:false
    })
    const eachUserPayment={
        personUsername:"",
        eachShareAmount:0
    }

    const [error,setError]=useState(null)

    const [stepCounter,setStepCounter]=useState(1)

    const headers=[
        {
            id:1,
            name:"DETAILS"
        },
        {
            id:2,
            name:"PARTICIPANTS"
        },
        {
            id:3,
            name:"SPLIT & REVIEW"
        },
    ]

    function vaildateSplitRecord(step){
        if(step===1){
            if(splitRecord.purpose?.trim().length<=0){
                setError("Add a short description.")
                return false;
            }
            const amount = Number(splitRecord.amount);
            const amountText = String(splitRecord?.amount ?? "").trim();
            if (
                amountText === "" ||
                !Number.isFinite(amount) ||
                amount <= 0){
                setError("Please enter a valid amount.");
                return;
            }
            setSplitRecord({
                ...splitRecord,
                amount
            });
            if(splitRecord.dateOfExpense===null){
                setError("Pick a date.")
                return false
            }
            return 1;
        }
    }
    
    return (
        <div className='mt-[70px] text-white p-3 flex flex-col gap-4'>
            <button className='flex gap-1 items-center text-sm text-slate-300' onClick={()=>navigate(-1)}>
                <GoArrowLeft/> Back
            </button>
            <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Split Expense</h2>
                <span className='text-xs text-slate-400'>Record a shared expense and split it with friends.</span>
            </div>
            {/* Original box of Split Expense starts now  */}
            <div className='backdrop-blur-xl bg-white/10 rounded-xl p-2 gap-2 flex flex-col'>
                <div className='flex justify-between py-2'>
                    {headers.map((header,index)=>(
                        <div key={index} className={`flex text-xs items-center gap-1 ${header.id <= stepCounter ? "text-purple-300":"text-slate-400"} `}>
                            {header.id <=stepCounter ? <GoDotFill/> : <GoDot/>}
                             {header.name}
                        </div>
                    ))}
                </div>
                {/* Loading Bar  */}
                <div className='w-full h-1 rounded bg-slate-400/20'>
                    <div className='h-1 bg-violet-600 transition-all duration-200 rounded-2xl' style={{width:`${stepCounter===1?"33":stepCounter===2?"66":"100"}%`}}></div>
                </div>
                {error && (
                    <div className='p-2 bg-red-500/5 backdrop-blur-lg text-xs text-red-400 rounded-xl border border-red-400/10'>
                       ! {error}
                    </div>
                )}
                
                {stepCounter===1?
                    <Stepper1 splitRecord={splitRecord} setSplitRecord={setSplitRecord} setError={setError}/> :
                    stepCounter===2 ? 
                        <Stepper2 splitRecord={splitRecord} setSplitRecord={setSplitRecord} setError={setError}/> :
                        <Stepper3 splitRecord={splitRecord} setSplitRecord={setSplitRecord} setError={setError}/>
                }   

                <div className='flex justify-between items-center w-full'>
                    <button className={`w-[45%] bg-slate-600 py-2 rounded-xl`} onClick={()=>{
                        if(stepCounter===1){
                            navigate(-1)
                        }
                        else{
                            setStepCounter(stepCounter-1)
                        }
                    }}>{stepCounter===1 ? "Cancel" : "Back"} </button>
                    <button className='w-[45%] bg-purple-600 py-2 rounded-xl flex justify-center items-center gap-2' onClick={()=>{
                        if(vaildateSplitRecord(stepCounter)===stepCounter){
                            setStepCounter(stepCounter+1)
                        }
                    }}> <BiRightArrow/> Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ExpenseSplitNew
