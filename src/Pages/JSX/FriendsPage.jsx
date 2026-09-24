import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserAddOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import FriendshipReceivedRequestCard from "../../Components/Friends/FriendshipReceivedRequestCard";
import FriendshipSentRequestCard from "../../Components/Friends/FriendshipSentRequestCard";
import { AnimatePresence,motion, warning } from "motion/react";
import Search from "../../Components/Friends/Search";
import { RxCross2 } from "react-icons/rx";
import AllPeopleSearch from "../../Components/Friends/AllPeopleSearch";
import PersonCard from "../../Components/Friends/PersonCard";
import NoSearchValue from "../../Components/Friends/NoSearchValue";
import LoadingIcon from "../../Components/LoadingIcon";
import FriendCard from "../../Components/Friends/FriendCard";
import NoUsersFound from "../../Components/Friends/NoUsersFound";


const FriendsPage = () => {
  const navigate=useNavigate();

  const [requestsLoading,setRequestsLoading]=useState(true);
  const [receivedRequests,setReceivedRequests]=useState(null);
  const [sentRequests,setSentRequests]=useState(null);

  const [friendsLoading,setFriendsLoading]=useState(true)
  const [friends,setFriends]=useState(null)
  const [filteredFriends,setFilteredFriends]=useState(null)

  const [loadingState,setLoadingState]=useState(null)

  const [loadingStateForSearch,setLoadingStateForSearch]=useState(null)

  const [seachValue,setSearchValue]=useState('')

  const [searchAll,setSearchAll]=useState('')
  const [searching,setSearching]=useState(false)
  const [searchAllPopup,setSearchAllPopup]=useState(false)
  const searchController=useRef(null)

  const token=localStorage.getItem("token");

  const [searchResults,setSearchResults]=useState(null)

  

  useEffect(()=>{
    fetchFriendRequests();
    fetchAllFriends();
  },[])

  useEffect(()=>{
    setSearching(true)
    const value=searchAll.trim()
    if(value.length===0){
      if(searchController.current){
        searchController.current.abort();
      }
      setSearchResults(null)
      setSearching(false)
      return;
    }
    const timer=setTimeout(()=>{
      searchAllPeople(value)
    },400)
    return ()=>{
      clearTimeout(timer)
    }
  },[searchAll]);

  async function sendRequest(email,id) {
    setLoadingStateForSearch({id:id,action:"ADDING"})
    try{
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends/createrequest`,{
        receiversemail:email
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success(response?.data?.msg)
      deletePersonInResponse(id)
      fetchFriendRequests()
    }
    catch(err){
      toast.error(err?.response?.data.msg||"Something went wrong")
    }
    finally{
      setLoadingState(null)
    }
  }

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
        toast.error(err?.response?.data?.msg);
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
    const value=searchAll.trim();
    if(value.length===0){
      if(searchController.current){
        searchController.current.abort();
      }
      setSearchResults(null)
      setSearching(false)

      return;
    }
    if(searchController.current){
      searchController.current.abort();
    }
    const controller=new AbortController();
    searchController.current=controller;

    setSearching(true)
    try{
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/searchusers`,{
        searchValue:value
      },{
        headers:{
          Authorization:`Bearer ${token}`
        },
        signal:controller.signal
      })
      if(!controller.signal.aborted){
        setSearchResults(response.data.list)
      }
    }
    catch(err){
      if(err.code==="ERR_CANCELED") return;
      toast.error(err.response?.data?.msg||"Something went wrong");
    }
    finally{
      if(!controller.signal.aborted){
        setSearching(false)
      }
    }
  }

  async function fetchAllFriends(){
    setFriendsLoading(true)
    try{
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/friends`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setFriends(response?.data.list||[]);
      setFilteredFriends(response?.data.list||[])
    }
    catch(err){
      toast.error(err?.response?.data.msg||"Something went wrong.");
    }
    finally{
      setFriendsLoading(false)
    }
  }

  function deleteRequestInArray(type,index){
    if(type===0){//Received Requests
      setReceivedRequests(prev=> prev.filter((_,i)=>i!=index))
    }
    else{
      setSentRequests(prev=>prev.filter((_,i)=>i!=index))    }
  }

  function deletePersonInResponse(id){
    setSearchResults(prev=>prev.filter((person)=>person.id===id && person.status==="SENT"))
  }

  function filterFriends(searchFriends) {
    const value = searchFriends.trim().toLowerCase();

    if (value.length === 0) {
        setFilteredFriends(friends);
    } else {
        setFilteredFriends(
            friends.filter(
                (friend) =>
                    friend.name?.toLowerCase().includes(value) ||
                    friend.username?.toLowerCase().includes(value)
            )
        );
    }
  }

  
    
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
                <motion.div initial={{y:20,opacity:0}} key={index} animate={{y:0,opacity:1}} exit={{opacity:0,x:100}} duration={0.5} layout>
                  <FriendshipReceivedRequestCard request={request} index={index} acceptRequest={acceptRequest} rejectRequest={rejectRequest} loadingState={loadingState}/>
                </motion.div>
              ))}
              {sentRequests && sentRequests.map((request,index)=>(
                <motion.div initial={{y:20,opacity:0}} key={index} animate={{y:0,opacity:1}} exit={{opacity:0,x:100}} duration={0.5} layout>
                  <FriendshipSentRequestCard request={request} index={index} cancelRequest={cancelRequest} loadingState={loadingState}/>
                </motion.div>
              ))
              }
              {(sentRequests?.length===0 && receivedRequests?.length===0) && <div className="w-full text-center text-xs text-slate-500 font-semibold">No Sent or Received requests</div> }
        </AnimatePresence>
      )
      }
      <Search filterFriends={filterFriends}/>
      <AnimatePresence mode="popLayout">
        {
          friendsLoading ?
          <div className="w-full flex justify-center items-center min-h-36">
            <LoadingIcon color="violet-700" height="5" width="5"/>
          </div>
          :
           (
            filteredFriends?.map((friend,id)=>(
              <motion.div key={friend.id} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}}>
                <FriendCard friendDetails={friend}/>
              </motion.div>
            ))
            
            (filteredFriends?.length===0 && null)
            
          )
        }
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {
          searchAllPopup && 
          (
            <motion.div initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} duration={50} className="flex flex-col w-[90%] bg-white/10 backdrop-blur-lg fixed p-4 top-[25%] left-5 gap-6 rounded-2xl z-10">
              <div className="flex justify-between items-center w-full">
                <h2>Add Friend</h2>
                <RxCross2 size={15} onClick={()=>{setSearchAllPopup(false);setSearchAll("")}}/>
              </div>
              <AllPeopleSearch searchAll={searchAll} setSearchAll={setSearchAll} searchAllPeople={searchAllPeople}/>
              {
                searching?
                (<div className="flex justify-center items-center min-h-36">
                  <div className="h-6 w-6 border-violet-600 border-2 border-b-transparent rounded-full animate-spin"></div>
                </div>):
                (
                  searchResults?.map((person,index)=>(
                    <PersonCard userDetails={person} key={index} loadingStateForSearch={loadingStateForSearch} sendRequest={sendRequest}/>
                  ))
                )
              }
              {!searching && (searchAll.trim().length===0 ?  <NoSearchValue/>:searchResults?.length===0 && <NoUsersFound/>)}
              
            </motion.div>
          )
        }
      </AnimatePresence>

    </div>
  )
}

export default FriendsPage
