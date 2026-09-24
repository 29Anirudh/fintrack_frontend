import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { RiCheckDoubleFill } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiHandCoinsThin } from "react-icons/pi";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FriendCard = ({friendDetails}) => {
    const navigate=useNavigate()
    const colors = [
        '#0F172A',
        '#172554',
        '#1E3A8A',
        '#312E81',
        '#3730A3',
        '#4C1D95',
        '#581C87',
        '#164E63',
        '#134E4A',
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const navigations=[
        {
            icon:<LuEye/>,
            title:"Profile",
            nav:"/"
        },
        {
            icon:<LiaUserFriendsSolid size={18}/>,
            title:"Split",
            nav:"/"
        },
        {
            icon:<PiHandCoinsThin size={18}/>,
            title:"Settle",
            nav:"/"
        }
    ]
  return (
    <div className="w-full p-2 bg-slate-500/30 rounded-xl flex flex-col gap-3">
        <div className='flex items-center gap-3'>
            <div className='rounded-full w-10 h-10 flex justify-center items-center' style={{backgroundColor:getRandomColor()}}>
                <span>{friendDetails?.name.slice(0,1)}</span>
            </div>
            <div className='flex justify-between w-[85%]'>
                <div className='flex flex-col h-full'>
                    <span className='font-semibold'>{friendDetails?.name}</span>
                    <span className='text-xs text-slate-400'>{friendDetails?.username}</span>
                </div>
                <div className={`flex text-xs border rounded-2xl h-[30%] px-2 py-1 justify-center items-center ${friendDetails?.totalExpenseAmount>0?"bg-green-500/10 text-green-500 border-green-800":friendDetails?.totalExpenseAmount<0?"bg-red-500/10 text-red-500 border-red-900":"bg-sky-600/10 text-sky-400 border-sky-700"}`}>
                    {friendDetails?.totalExpenseAmount>0?(<><FaArrowDownLong/><span>Owes you ₹{friendDetails?.totalExpenseAmount}</span></>):friendDetails?.totalExpenseAmount<0?(
                        <><FaArrowUpLong/><span>You owe ₹{Math.abs(friendDetails?.totalExpenseAmount)}</span></>
                    ):<><RiCheckDoubleFill size={10}/> Settled</>}
                </div>
            </div>
        </div>
        <div className="flex w-full gap-2">
            {navigations.map((navigation,index)=>(
                <button key={index} disabled={navigation.title==="Settle"&&friendDetails?.totalExpenseAmount===0} className="rounded-lg gap-2 flex items-center text-sm justify-center w-[28%] bg-slate-500/40 px-2 py-1 disabled:opacity-55" onClick={()=>navigate(navigation.nav)}><>{navigation.icon}{navigation.title}</></button>
            ))}
            <div className="bg-slate-500/40 w-[7%] rounded-xl flex justify-center items-center p-1">
                <AiOutlineUserDelete/>
            </div>
            
        </div>

    </div>
    
  )
}

export default FriendCard
