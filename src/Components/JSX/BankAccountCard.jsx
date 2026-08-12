import { BsBank } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";

const BankAccountCard = ({bankDetails,index,setShowConfirmationBox,setDeleteId}) => {
  const nav=useNavigate();
  return (
    <div className='relative border-t-4 shadow-lg bg-slate-400/10 border-sky-600 rounded-xl flex flex-col w-[95%] p-5'  key={index}>
      <div className='flex w-full justify-between'>
        <div className='flex justify-center items-center gap-4'>
          <div className='bg-sky-600/10 text-sky-600 p-3 rounded-full flex justify-center items-center'><BsBank size={20}/></div>
          <div className='flex flex-col justify-start'>
            <span className='font-semibold text-lg'>{bankDetails.bankname}</span>
            <span className='text-sm text-slate-400'>{bankDetails.accountType}</span>
          </div>
        </div>
        <span className={`text-right absolute right-5 text-xs border font-semibold p-2 pt-1 pb-1 rounded-2xl ${bankDetails?.status==='Active'?"bg-green-600/10 border-green-900":"bg-red-600/10 border-red-900"}`}>{bankDetails.status}</span>
      </div>
      <div>
        <span className='text-sm text-gray-500 font-semibold'>**** **** **** {bankDetails.accountno.slice(bankDetails.accountno.length-4)}</span>
      </div>
      <div>
        <p className='text-xs text-gray-500 font-semibold'>CURRENT BALANCE</p>
        <span className='font-bold text-2xl'>₹{bankDetails.balance}</span>
      </div>
      <hr className='border-gray-900 m-2 border' />
      <div className='w-full mt-2 flex justify-between items-center'>
        <button className='pl-5 pr-5 rounded-xl p-1 text-sm bg-violet-600/10 text-violet-300 hover:scale-105 transition-all' onClick={()=>nav(`${bankDetails.accountno}`)}>Login to View Details</button>
        <button className='p-2 text-red-800 bg-red-600/10 rounded-full absolute right-5 bottom-4 scale-95 hover:scale-100 transition-all' onClick={()=>{setShowConfirmationBox(true);setDeleteId(bankDetails.accountno)}}><MdDeleteOutline size={25}/></button>
      </div>
    </div>
  )
}

export default BankAccountCard
