import React from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const TransactionCardWithFullDetails = ({transaction,key}) => {
    const nav=useNavigate()
    const date=new Date(transaction.transactiontime);
    const formatted=date.toLocaleString("en-in",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    })
  return (
    <div className='flex gap-2 w-full items-center border cursor-pointer border-slate-600 rounded-xl pt-3 pb-3 pl-2 pr-2 hover:-translate-y-2 hover:bg-white/10 transition-all' key={transaction.transactionId} onClick={()=>{
        nav(`edit/${transaction?.transactionId}`,{
            state:{
                currentBankAccount:transaction?.accountno
            }
        });
    }
    }>
        <div className={`${transaction.transactionType==="DEBIT"?'bg-red-400/5':'bg-green-300/5'} rounded-3xl p-3`}>{transaction.transactionType==="DEBIT"?<FaLongArrowAltUp size={15} className='text-red-800'/>:<FaLongArrowAltDown size={15} color="green"/>}</div>
        <div className='flex flex-col w-[80%]'>
            <div className='flex w-full pr-2 justify-between items-center'>
                <p className="truncate w-[60%] font-semibold">{transaction.description}</p>
                <p className={`shrink-0 ${transaction.transactionType==="DEBIT"?'text-red-700':'text-green-600'} text-xl w-[30%] text-right font-bold`}>{transaction.transactionType==="DEBIT"?'-':'+'}₹{transaction.amount}</p>
            </div>
            <div className='flex justify-between pr-2 text-xs text-slate-500'>
                <span className='w-[30%] line-clamp-1'>{transaction.bankname}</span><span className='text-violet-600'> &middot;</span><span className='w-[30%] line-clamp-1'>**** **** {transaction.accountno.slice(transaction.accountno.length-4)}</span><span className='text-violet-600'> &middot;</span> <span className='w-[30%] line-clamp-1'>{formatted}</span> 
            </div>
        </div>
        <FaAngleRight className='text-white/60' size={12}/>
    </div>
  )
}

export default TransactionCardWithFullDetails
