import { RiCloseFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { AnimatePresence,motion } from "motion/react";

const FriendshipReceivedRequestCard = ({ request, index,rejectRequest,acceptRequest,loadingState }) => {
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
    const isAccepting=loadingState?.id===index && loadingState?.action==="Accepting";
    const isRejecting=loadingState?.id===index && loadingState?.action==="Rejecting"
    return (
            <div className='flex w-full justify-between p-3 bg-slate-900 rounded-xl'>
                <div className="flex">
                    <div className='rounded-full p-2 w-14 h-14 flex items-center justify-center text-lg font-semibold' style={{ backgroundColor:getRandomColor()}}>{request?.name.substring(0, 1)}</div>
                    <div className="flex flex-col justify-center ml-3">
                        <span className="font-semibold">{request.name}</span>
                        <span className="text-slate-400">{request.username}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="bg-slate-600 px-3 rounded-xl hover:bg-red-700/20 hover:text-red-600 transition-all" disabled={loadingState!==null} onClick={()=>rejectRequest(request.email,index)}>
                        {
                            isRejecting ? <div className="h-5 w-5 border-2 border-red-700 rounded-full border-b-transparent animate-spin"></div>:<RiCloseFill size={22}/>
                        }
                        
                    </button>
                    <button className="bg-green-500 px-3 rounded-xl hover:bg-green-700 transition-all" disabled={loadingState!==null} onClick={()=>acceptRequest(request.email,index)}>
                        {
                            isAccepting ? <div className="h-5 w-5 border-2 border-green-700 rounded-full border-b-transparent animate-spin"></div>: <TiTick size={22}/>
                        }
                    </button>
                </div>
            </div>
    )
}

export default FriendshipReceivedRequestCard
