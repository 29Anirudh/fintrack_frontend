import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { FaClockRotateLeft } from "react-icons/fa6";

const FriendshipSentRequestCard = ({request,index,cancelRequest,loadingState}) => {
  const colors = [
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
      const isCancelling=loadingState?.id===index && loadingState?.action==="Cancelling";
      return (
          <div className='flex w-full justify-between p-3 bg-slate-900 rounded-xl mt-3'>
              <div className="flex">
                  <div className='rounded-full p-2 w-14 h-14 flex items-center justify-center text-lg font-semibold' style={{ backgroundColor:getRandomColor()}}>{request?.name.substring(0, 1)}</div>
                  <div className="flex flex-col justify-center ml-3">
                      <span className="font-semibold">{request.name}</span>
                      <span className="text-slate-400 text-sm">{request.username}</span>
                      <span className='bg-sky-400/20 text-sky-400 w-20 flex gap-1 p-1 text-xs items-center justify-center rounded-xl mt-1'><FaClockRotateLeft size={10}/>Pending</span>
                  </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                  <button className="bg-slate-600 px-3 flex gap-1 items-center p-2 rounded-xl hover:bg-slate-700 transition-all outline-none" disabled={loadingState!==null} onClick={()=>cancelRequest(request.email,index)}>
                    {
                        isCancelling ?  <div className="h-5 w-5 border-2 border-slate-900 rounded-full border-b-transparent animate-spin"></div>: 
                        (<><RiCloseFill size={18}/> <span>Cancel</span></>)
                    }
                    
                  </button>
              </div>
          </div>
      )
}

export default FriendshipSentRequestCard
