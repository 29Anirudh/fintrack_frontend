
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
const RecentTransactionCard = ({transaction,key}) => {
  const date = new Date(transaction.transactiontime);

  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  return (
    <div className='flex gap-2 w-full items-center border border-slate-600 rounded-xl pt-3 pb-3 pl-2 pr-2 hover:-translate-y-2 hover:bg-white/10 transition-all' key={transaction.transactionId}>
      <div className={`${transaction.transactionType==="DEBIT"?'bg-red-400/5':'bg-green-300/5'} rounded-3xl p-4`}>{transaction.transactionType==="DEBIT"?<FaLongArrowAltUp size={20} color="red"/>:<FaLongArrowAltDown size={20} color="green"/>}</div>
      <div className='flex-1 min-w-0'>
        <p className="text-xl truncate font-semibold">{transaction.description}</p>
        <p className="text-sm text-slate-500">{transaction.bankname} &middot;{transaction.accountno} </p>
      </div>
      <div className='text-right w-[30%] pr-2'>
        <p className={`${transaction.transactionType==="DEBIT"?'text-red-600':'text-green-600'} text-2xl font-bold`}>{transaction.transactionType==="DEBIT"?'-':'+'}{transaction.amount}</p>
        <p className="text-xs">{formatted}</p>
      </div>
    </div>
  )
}

export default RecentTransactionCard
