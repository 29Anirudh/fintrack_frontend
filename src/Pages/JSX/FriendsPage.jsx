import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserAddOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import FriendshipReceivedRequestCard from "../../Components/Friends/FriendshipReceivedRequestCard";
import FriendshipSentRequestCard from "../../Components/Friends/FriendshipSentRequestCard";
import { AnimatePresence,motion } from "motion/react";
import Search from "../../Components/Friends/Search";
import { RxCross2 } from "react-icons/rx";
import AllPeopleSearch from "../../Components/Friends/AllPeopleSearch";
import PersonCard from "../../Components/Friends/PersonCard";


const FriendsPage = () => {
  const navigate=useNavigate();

  const [requestsLoading,setRequestsLoading]=useState(false);
  const [receivedRequests,setReceivedRequests]=useState(null);
  const [sentRequests,setSentRequests]=useState(null);

  const [loadingState,setLoadingState]=useState(null)

  const [seachValue,setSearchValue]=useState('')

  const [searchAll,setSearchAll]=useState('')

  const [searching,setSearching]=useState(false)

  const [searchAllPopup,setSearchAllPopup]=useState(false)
  const token=localStorage.getItem("token");

  const [searchResults,setSearchResults]=useState(null)

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
  async function acceptRequest(emailId,key) {
    setLoadingState({
      id:key,
      action:"Accepting"
    })
    try{
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends/acceptrequest`,{
        receiversemail:emailId
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success(response.data.msg)
      deleteRequestInArray(0,key)
    }
    catch(err){
      toast.error(err.response.data.msg)
      fetchFriendRequests();
    }
    finally{
      setLoadingState(null)
    }
  }

  async function rejectRequest(emailId,key){
    setLoadingState({
      id:key,
      action:"Rejecting"
    })
    try{
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends/rejectrequest`,{
        receiversemail:emailId
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success(response.data.msg)
      deleteRequestInArray(0,key)
    }
    catch(err){
      toast.error(err.response.data.msg)
      fetchFriendRequests();
    }
    finally{
      setLoadingState(null)
    }
  }

  async function cancelRequest(emailId,index) {
    setLoadingState({
      id:index,
      action:"Cancelling"
    })
    try{
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends/cancelrequest`,{
        receiversemail:emailId
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success(response.data.msg)
      deleteRequestInArray(1,index)
    }
    catch(err){
      toast.error(err.response.data.msg)
      fetchFriendRequests();
    }
    finally{
      setLoadingState(null)
    }
    
  }

  async function searchAllPeople(searchAll){
    setSearching(true)
    try{
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/searchusers`,{
        searchValue:searchAll
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setSearchResults(response.data.list)
    }
    catch(err){
      toast.error(err.response.data.msg);
    }
    finally{
      setSearching(false)
    }
  }

  function deleteRequestInArray(type,index){
    if(type===0){//Received Requests
      setReceivedRequests(prev=> prev.filter((_,i)=>i!=index))
    }
    else{
      setSentRequests(prev=>prev.filter((_,i)=>i!=index))    }
  }

  

  useEffect(()=>{
        fetchFriendRequests();
    },[])
    
  return (
    <div className='mt-[70px] pb-[100px] p-2 min-h-[calc(100vh-140px)] text-slate-200 flex flex-col gap-4 relative'>
      {/* Header  */}
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
            <h2 className='font-semibold text-lg'>Friends</h2>
            <span className='text-xs'>Manage your friends and shared expenses</span>
        </div>
        <button className='flex gap-1 items-center justify-center bg-blue-600 rounded-xl p-1 text-sm cursor-pointer hover:bg-blue-800 transition-colors' onClick={()=>setSearchAllPopup(true)}>
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
        <AnimatePresence mode="popLayout" >
          
              {receivedRequests && receivedRequests.map((request,index)=>(
                <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{opacity:0,x:100}} duration={0.5} layout>
                  <FriendshipReceivedRequestCard request={request} key={index} index={index} acceptRequest={acceptRequest} rejectRequest={rejectRequest} loadingState={loadingState}/>
                </motion.div>
              ))}
              {sentRequests && sentRequests.map((request,index)=>(
                <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{opacity:0,x:100}} duration={0.5} layout>
                  <FriendshipSentRequestCard request={request} key={index} index={index} cancelRequest={cancelRequest} loadingState={loadingState}/>
                </motion.div>
              ))
              }
              {(sentRequests?.length===0 && receivedRequests?.length===0) && <div className="w-full text-center text-xs text-slate-500 font-semibold">No Sent or Received requests</div> }
        </AnimatePresence>
      )
      }
      <Search/>
      <AnimatePresence mode="popLayout">
        {
          searchAllPopup && 
          (
            <div className="flex flex-col w-[90%] bg-white/10 backdrop-blur-lg fixed p-4 top-[25%] left-5 gap-6 rounded-2xl z-10">
              <div className="flex justify-between items-center w-full">
                <h2>Add Friend</h2>
                <RxCross2 size={15}/>
              </div>
              <AllPeopleSearch searchAll={searchAll} setSearchAll={setSearchAll}/>
              {
                searching?
                (<div className="flex justify-center items-center min-h-20">
                  <div className="h-6 w-6 border-violet-600 border-2 border-b-transparent rounded-full animate-spin"></div>
                </div>):
                (
                  searchResults?.map((person,index)=>(
                    <PersonCard userDetails={person}/>
                  ))
                )
              }
            </div>
          )

        }
      </AnimatePresence>

    </div>
  )
}

export default FriendsPage
