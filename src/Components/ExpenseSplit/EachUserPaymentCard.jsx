import { CiClock2 } from 'react-icons/ci'
import { LuCrown } from 'react-icons/lu'
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { useState } from 'react';
const EachUserPaymentCard = ({eachUserPayment,isLoggedInUserOwner,markAsPaid,setPaymentRecord,setCardOpen,cardOpen,loadingItems}) => {
  const markAsPaidLoading=loadingItems.action==="MarkAsPaid" && loadingItems.id===eachUserPayment.id;

  const [basicAccountDetails,setBasicAccountDetails]=useState(null)
  const [basicAccountDetailsLoading,setBasicAccountDetailsLoading]=useState(false)

  const[selectedMaskedAccountNo,setSelectedMaskedAccountno]=useState(null)
  const [isThereATransaction,setIsThereATransaction]=useState(false)

  const colors=[
    {
      status:"PENDING",
      color:"border-grey-800 bg-grey-600/20 text-grey-500",
      icon:<CiClock2/>
    },
    {
      status:"AWAITING_CONFIRMATION",
      color:"border-orange-800 bg-orange-600/20 text-orange-600",
      icon:<CiClock2/>
    },
    {
      status:"REJECTED",
      color:"border-red-800 bg-red-600/20 text-red-500",
      icon:<CiClock2/>
    },
    {
      status:"PAID",
      color:"border-green-800 bg-green-600/20 text-green-500",
      icon:<LiaCheckDoubleSolid/>
    },
  ]
  async function loadBankAccounts(){
    setBasicAccountDetailsLoading(true)
    try{
      const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/basicdetails`, {
              headers: {
                  Authorization: `Bearer ${token}`    
              }
      })
      setBasicAccountDetails(res.data.details)
    }
    catch(err){
      toast.error(err.response.data.msg||"Something went wrong");
      setCardOpen(false)
    }finally{
      setBasicAccountDetailsLoading(false)
    }
  }

  function paymentRecordSetting(){
    setPaymentRecord(prev=>({
      ...prev,
      personsUsername:eachUserPayment?.username,
      amount:eachUserPayment?.shareAmount,
      isThereATransaction:isThereATransaction,
      maskedAccountno:selectedMaskedAccountNo
    }))
  }

  const color=colors.find((box)=>box.status===eachUserPayment.eachPaymentStatus)?.color;
  const icon=colors.find((box)=>box.status===eachUserPayment.eachPaymentStatus)?.icon;
  return (
    <div className='bg-gray-900 flex flex-col p-2 rounded-xl shadow-lg border border-slate-800 gap-3'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='font-semibold flex gap-1 items-center'>{eachUserPayment?.name}{eachUserPayment?.isOwner&&<span className='font-light flex gap-1 items-center text-xs'><LuCrown size={10}/>· Paid</span>}</span>
          <span className='text-xs text-slate-400 '>{eachUserPayment?.username}</span>
        </div>
        <span className='font-semibold flex justify-center items-center gap-1'><span className='text-slate-400 text-xs font-light'>Share: </span>₹{eachUserPayment?.shareAmount}</span>
      </div>
      <div className='border border-slate-800'/>
      <div className='flex justify-between items-center gap-2'>
        <span className='text-slate-500 text-xs'>PAYMENT</span>
        <div className='text-xs'>
          {
            isLoggedInUserOwner ? 
            (
              <div className='flex justify-end gap-2'>
                <div className={`flex gap-1 ${color} rounded-lg items-center px-2 font-semibold`}>
                  {icon}{eachUserPayment?.eachPaymentStatus}
                </div>
                {eachUserPayment?.eachPaymentStatus==="PENDING"  ?
                (<button className='bg-violet-700 font-semibold px-2 rounded-lg py-1'>Mark as Received</button>)  :
                (eachUserPayment?.eachPaymentStatus==="AWAITING_CONFIRMATION" && <div className='flex gap-2 font-bold'><button className='bg-red-600/30 text-red-500 w-6 h-6 hover:scale-[1.05] transition-all'>✗</button><button className='bg-green-600/30 text-green-500 w-6 h-6 hover:scale-[1.05] transition-all'>✓</button></div>)
                }
              </div>
            ):
            //Logged in user is not the owner of the current split
            (
            <div className='flex justify-end gap-2'>
              {eachUserPayment?.name==="You" ? (
                eachUserPayment?.eachPaymentStatus==="PENDING"  ?  (<button className='bg-violet-700 font-semibold px-2 rounded-lg py-1' onClick={()=>{
                  paymentRecordSetting();
                  markAsPaid(eachUserPayment.id)
                }}>Mark as Paid</button>)  :
                eachUserPayment?.eachPaymentStats==="REJECTED" ? (<button className='bg-violet-700 font-semibold px-2 rounded-lg py-1'>Mark as Paid again</button>):
                (<div className={`flex gap-1 border ${color} rounded-lg items-center px-2 font-semibold `}>
                  {icon}{eachUserPayment?.eachPaymentStatus}
                </div>)
              ) : (
                <div className={`flex gap-1 border ${color} rounded-lg items-center px-2 font-semibold`}>
                  {icon}{eachUserPayment?.eachPaymentStatus}
                </div>
              )}
              
              
            </div>)
          }
            
        </div>
      </div>
    </div>
  )
}

export default EachUserPaymentCard
