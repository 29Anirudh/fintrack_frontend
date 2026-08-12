import React from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'

const TransactionCard = ({ transaction }) => {
    const date=new Date(transaction.transactiontime);
    const formatted=date.toLocaleString("en-in",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    })
    return (
        <div className='flex gap-2 w-full items-center border border-slate-600 rounded-xl pt-3 pb-3 pl-2 pr-2 hover:-translate-y-2 hover:bg-white/10 transition-all' key={transaction.transactionId}>
            <div className={`${transaction.transactionType === "DEBIT" ? 'bg-red-400/5' : 'bg-green-300/5'} rounded-3xl p-3`}>{transaction.transactionType === "DEBIT" ? <FaLongArrowAltUp size={15} color="red" /> : <FaLongArrowAltDown size={15} color="green" />}</div>
            <div className='flex-1 min-w-0'>
                <p className="text-lg truncate font-semibold">{transaction.description}</p>
                <p className="text-xs opacity-50">{formatted}</p>
            </div>
            <div className='text-right w-[30%] pr-2'>
                <p className={`${transaction.transactionType === "DEBIT" ? 'text-red-700' : 'text-green-600'} text-xl font-bold`}>{transaction.transactionType === "DEBIT" ? '-' : '+'} ₹{transaction.amount}</p>
            </div>
        </div>
    )
}

export default TransactionCard
