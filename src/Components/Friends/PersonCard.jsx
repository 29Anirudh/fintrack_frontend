import { FaUserFriends } from "react-icons/fa";
import { MdOutlineLoop } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { IoIosPersonAdd } from "react-icons/io";
import { RiCheckDoubleFill } from "react-icons/ri";
import LoadingIcon from "../LoadingIcon";


const PersonCard = ({userDetails,loadingStateForSearch,sendRequest}) => {
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
    const adding=loadingStateForSearch?.action==="ADDING" && loadingStateForSearch?.id===userDetails.id
  return (
    <div className='flex bg-slate-800 rounded-xl p-2 gap-2 items-center' >
      <div className='rounded-full w-10 h-10 flex items-center justify-center p-2' style={{backgroundColor:getRandomColor()}}>
        <h2 className='text-lg'>{userDetails.name.slice(0,1)}</h2>
      </div>
      <div className='flex justify-between items-center w-[85%]'>
        <div className='flex flex-col justify-between items-start'>
          <span>{userDetails?.name}</span>
          <span className='text-xs text-slate-400'>{userDetails?.username}</span>
        </div>
        <div className="">
          {
            userDetails?.status==="ACCEPTED"? 
            (
              <div className="flex items-center gap-1 text-xs text-slate-400 rounded-xl mr-2">
                <FaUserFriends className=""/>Friends
              </div>
            ):
            userDetails?.status==="REJECTED"?(
              <div className="flex items-center gap-1 text-xs text-red-500 font-semibold bg-red-500/10 p-1 rounded-xl mr-2"> 
              
                <MdOutlineLoop/> Re-Request
              </div>
            ):userDetails?.status==="REQUESTED" ? (
              <div className="flex items-center gap-1 text-xs text-slate-400 rounded-xl mr-2">
                <LuClock3/> Requested
              </div>
            ): userDetails?.status==="SENT" ? (
              <div className="flex items-center gap-1 text-xs text-blue-400 rounded-xl mr-2">
                <RiCheckDoubleFill/> Sent
              </div>
            ):(
              <button disabled={adding} onClick={()=>sendRequest(userDetails.email,userDetails.id)} className={`flex gap-1 text-sm items-center justify-center mr-2 min-w-10 min-h-6 bg-violet-800 px-[6px] py-1 rounded-lg `}>
                {adding?<LoadingIcon color="white" width="4" height="4"/>: <><IoIosPersonAdd size={16}/> Add</>}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default PersonCard
