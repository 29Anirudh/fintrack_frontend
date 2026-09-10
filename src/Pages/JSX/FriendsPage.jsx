import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserAddOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import FriendshipReceivedRequestCard from "../../Components/Friends/FriendshipReceivedRequestCard";
import FriendshipSentRequestCard from "../../Components/Friends/FriendshipSentRequestCard";

const FriendsPage = () => {
  const navigate=useNavigate();

  const [requestsLoading,setRequestsLoading]=useState(false);
  const [receivedRequests,setReceivedRequests]=useState(null);
  const [sentRequests,setSentRequests]=useState(null);

  const token=localStorage.getItem("token");

  async function fetchFriendRequests() {
    setRequestsLoading(true)
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/friends/requests`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setReceivedRequests(response.data.receivedRequests);
        setSentRequests(response.data.sentRequests);
    }
    catch(err){
        toast.error(err.respose.data.msg);
        navigate("/")
    }
    finally{
        setRequestsLoading(false);
    }
  }

  useEffect(()=>{
        fetchFriendRequests();
    },[])
    
  return (
    <div className='mt-[70px] pb-[100px] p-2 min-h-[calc(100vh-140px)] text-slate-200 flex flex-col gap-4'>
      {/* Header  */}
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
            <h2 className='font-semibold text-lg'>Friends</h2>
            <span className='text-xs'>Manage your friends and shared expenses</span>
        </div>
        <button className='flex gap-1 items-center justify-center bg-blue-600 rounded-xl p-1 text-sm cursor-pointer hover:bg-blue-800 transition-colors'>
            <IoIosPersonAdd size={20}/> Add Friend
        </button>
      </div>
      {/* Requests */}
      <h3 className='flex items-center gap-2 text-slate-400 font-semibold'>
        <TiUserAddOutline size={22} className='text-sky-500'/> REQUESTS
      </h3>
      {requestsLoading?
        <div className="flex justify-center items-center min-h-20">
            <div className="h-6 w-6 border-violet-600 border-2 border-b-transparent rounded-full animate-spin"></div>
        </div>
      :(
        <div>
            {receivedRequests && receivedRequests.map((request,index)=>(
                <FriendshipReceivedRequestCard request={request} index={index}/>
            ))}
            {sentRequests && sentRequests.map((request,index)=>(
                <FriendshipSentRequestCard request={request} index={index}/>
             ))
            }
        </div>
      )
      
      }

    </div>
  )
}

export default FriendsPage
