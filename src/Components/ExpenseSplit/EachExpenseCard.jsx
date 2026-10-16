import { LuCrown } from "react-icons/lu";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { IoWallet } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const EachExpenseCard = ({expense}) => {
    const formattedDate=new Date(expense?.dateOfExpense).toLocaleString("en-IN",{
        day:"2-digit",
        month:"short",
        year:"numeric"
    })
    const countOfRemainingPeople=expense?.numberOfPeopleSettled-1;
    const navigate=useNavigate();
    return (
        <div className='w-full flex flex-col gap-2 bg-gray-900 border border-slate-700 p-2 rounded-2xl hover:bg-gray-800 transition-all' onClick={()=>navigate(`${expense?.spltiId}`)}>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold'>{expense?.purpose}</span>
                    <span className='text-xs flex gap-1 opacity-70 text-slate-400'>
                        <LuCrown/>  Paid By {expense.paidByName} &bull; {formattedDate}
                    </span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-lg font-semibold'>₹{expense.amount}</span>
                    <span className='text-xs opacity-50 text-slate-400'>{expense.numberOfPeople} participants</span>
                </div>
            </div>
            <div className={`${(expense.paidByName==="You" || expense?.splitStatus==="SETTLED")?"bg-green-600/20 border-green-800 border text-green-400":"bg-red-600/10 border-red-800 border text-red-400"} rounded-lg p-1 px-2 text-xs`}>
                {expense.paidByName==="You"?
                    (expense?.splitStatus==="SETTLED" ? (<span className='p-3'>Everyone settled</span>):(
                       <div className='p-1 flex justify-between items-center'>
                            <div className='flex gap-1 items-center'>
                                <CiSaveDown1 strokeWidth={2} size={15} className='text-green-400 '/>
                                <span>
                                    {expense?.oneUsernameNotPaid} {countOfRemainingPeople>0 ? `+${countOfRemainingPeople} more owe you` :"owes you" }
                                </span>
                            </div>
                            <span className='text-base font-semibold'>₹{expense.amount-expense.myShare}</span>

                        </div> 
                    )):
                     (expense?.splitStatus==="SETTLED" ? (<span className='p-3 '>Everyone settled</span>):
                    (<div className='p-1 flex justify-between items-center'>
                        <div className='flex gap-1 items-center'>
                            <CiSaveUp1 strokeWidth={2} size={15} className='text-red-400 '/>
                            <span>You owe {expense.paidByName}</span>
                        </div>
                        <span className='text-base font-semibold'>₹{expense.myShare}</span>
                    </div>))
                }
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between text-xs text-slate-300'>
                    <span className='flex items-center gap-1'><IoWallet/> Your share ₹{expense.myShare}</span>
                    {expense?.splitStatus==="SETTLED" ? 
                        <span className='flex items-center gap-1 text-green-400'><LiaCheckDoubleSolid/> Completed</span>
                    :
                    <span className='flex items-center gap-1 text-sky-400'>
                        <LuClock3/> {expense.numberOfPeopleSettled}/{expense.numberOfPeople} settled
                    </span>}
                </div>
                <div className='w-full overflow-hidden h-1 rounded-xl bg-gray-800'>
                    <div className={`${expense.numberOfPeopleSettled===expense.numberOfPeople?"bg-green-600":"bg-violet-600"} h-1 rounded-xl`} style={{width:`${(expense?.numberOfPeopleSettled/expense?.numberOfPeople)*100}%`}}/>
                </div>
            </div>
            <span className='text-violet-400 flex gap-1 justify-end items-center text-xs'>View Details <MdOutlineKeyboardArrowRight/></span>
        </div>
    )
}

export default EachExpenseCard
