import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import LoadingIcon from "../LoadingIcon"
import { motion,AnimatePresence } from "motion/react"
import { RxCross2 } from "react-icons/rx";

const Dropdown2=({cardDetails,setCardDetails,paymentRecord,setPaymentRecord,splitMethods,loadingItems})=>{ //For Accept and Reject payment
  const confirmLoading= loadingItems?.action==="ConfirmPayment" && loadingItems?.id===cardDetails.eachUserPayment?.id
  const rejectLoading= loadingItems?.action==="RejectPayment" && loadingItems?.id===cardDetails.eachUserPayment?.id
  const [dropdownopen,setDropdownopen]=useState(false)

  const [basicAccountDetails,setBasicAccountDetails]=useState(null)
  const [basicAccountDetailsLoading,setBasicAccountDetailsLoading]=useState(true)

  const [selectedAccount,setSelectedAccount]=useState(null)

  const token=localStorage.getItem("token")

  async function loadBankAccounts(){
    setBasicAccountDetailsLoading(true)
    try{
      const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/basicdetails`, {
            headers: {
                Authorization: `Bearer ${token}`    
            }
      })
      setBasicAccountDetails(response?.data.details)
    }
    catch(err){
      toast.error(err?.response?.data.msg||"Something went wrong");
      setCardDetails(false)
    }finally{
      setBasicAccountDetailsLoading(false)
    }
  }
  useEffect(()=>{
    loadBankAccounts();
  },[])
  return(
    <div className='w-full flex flex-col gap-4 justify-center items-center bg-white/5 backdrop-blur-xl p-3 rounded-2xl shadow-lg shadow-white/30'>
        <div className="flex gap-5 justify-between w-full items-center">
            <span className="font-semibold">{cardDetails.methodName==="confirmPayment" ? "Confirm Payment":"Reject Payment"}</span>
            <RxCross2 className="text-red-300" onClick={()=>{
                setCardDetails(null);
            }}/>
        </div>
        <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold text-xl">₹{cardDetails.eachUserPayment.shareAmount}</h2>
            <span className="text-slate-400 text-sm">{cardDetails.methodName==="paid"?"Your share":`${cardDetails.eachUserPayment?.username}'s share`}</span>
        </div>
        
        
        {cardDetails.methodName==="rejectPayment"?
        (<div className="bg-red-700/30 w-[90%] px-3 text-red-300 py-1 rounded-xl text-sm text-center">
            Reject {cardDetails.eachUserPayment?.username}'s payment claim of ₹{cardDetails.eachUserPayment.shareAmount}? They can submit it again
        </div>):
        <div className="bg-green-700/30 w-[90%] px-3 text-green-300 py-1 rounded-xl text-sm text-center">
            {cardDetails.eachUserPayment?.username} marked this share as paid.Confirm you've received ₹{cardDetails.eachUserPayment.shareAmount}?
        </div>
        }
            
        {cardDetails.methodName==="confirmPayment" && (
            <>
                <div className="flex flex-col w-[90%] justify-start gap-1">
                    <span className="text-xs text-slate-300">Select your bank account</span>
                    {
                        basicAccountDetailsLoading ? 
                        (<div className="w-full min-h-12 flex items-center justify-center">
                        <LoadingIcon color="violet-500" width={5} height={5}/>
                        </div>):(
                        <div className="relative w-full">
                        {/* Selected Account */}
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDropdownopen(!dropdownopen)}
                            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left outline-none transition-all hover:border-violet-400/50 focus:shadow-lg focus:shadow-violet-400/10"
                        >
                            <span
                                className={
                                    selectedAccount?.accountname
                                        ? "text-white"
                                        : "text-white/40"
                                }
                            >
                                {selectedAccount?.accountname
                                    ? `${selectedAccount.accountname} **** **** **** ${selectedAccount.maskedAccountid.slice(-4)}`
                                    : "Select Account"}
                            </span>

                            <span
                                className={`transition-transform duration-200 ${dropdownopen ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </motion.button>

                        {/* Dropdown Options */}
                        <AnimatePresence>
                            {dropdownopen && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -8,
                                        scale: 0.98
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        scale: 0.98
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-gray-900 p-1 shadow-xl"
                                >
                                    {basicAccountDetails?.map((account) => (
                                        <button
                                            key={account.maskedAccountid}
                                            type="button"
                                            onClick={() => {
                                                setPaymentRecord({
                                                    ...paymentRecord,
                                                    maskedAccountno: account.maskedAccountid
                                                });

                                                setSelectedAccount(account);
                                                setDropdownopen(false);
                                            }}
                                            className="w-full rounded-lg px-3 py-2 text-left text-white transition-all hover:bg-violet-500"
                                        >
                                            {account.accountname} **** **** ****{" "}
                                            {account.maskedAccountid.slice(-4)}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                        )
                    }
                </div>
                <div className="flex flex-col w-[92%] bg-black/20 border border-slate-500/30 rounded-xl p-2 justify-center items-end gap-1 text-sm">
                    <label className="flex items-center gap-1">
                        <input type="checkbox" defaultChecked={!paymentRecord.isThereATransaction} className="accent-violet-700 w-6" onChange={(e)=>{
                            setPaymentRecord({
                                ...paymentRecord,
                                isThereATransaction:e.target.checked
                            })
                        }}/>
                        Create a transaction for this expense
                    </label>
                    <span className="text-xs text-slate-400">Adds a {cardDetails.methodName==="paid"?`debit`:"credit"} of ₹{cardDetails.eachUserPayment?.shareAmount} to your selected account</span>
                </div>
            </>
        )}
        <div className="flex justify-between w-full mt-4">
            <button className="w-[40%] bg-slate-700 rounded-xl py-3" onClick={()=>{
                setCardDetails(null);
            }}>Cancel</button>

            {cardDetails.methodName==="confirmPayment"?(
                <button className="w-[50%] bg-violet-800 rounded-xl py-3 flex items-center justify-center" disabled={confirmLoading} onClick={()=>{
                    splitMethods.confirmPayment(cardDetails.eachUserPayment?.id,{...paymentRecord,
                                                                            amount:cardDetails.eachUserPayment?.shareAmount,
                                                                            personsUsername:cardDetails.eachUserPayment?.username});
                }} >
                    {confirmLoading ? <LoadingIcon color="violet-500" height={5} width={5}/> : "Confirm Payment"}
                </button>
                ):(
                <button className="w-[50%] bg-red-800 rounded-xl py-3 flex items-center justify-center" disabled={rejectLoading} onClick={()=>{
                    splitMethods.rejectPayment(cardDetails.eachUserPayment?.id,{...paymentRecord,
                                                                            amount:cardDetails.eachUserPayment?.shareAmount,
                                                                            personsUsername:cardDetails.eachUserPayment?.username})
                }} >
                    {rejectLoading ? <LoadingIcon color="violet-500" height={5} width={5}/> : "Reject Payment"}
                </button>
                )
            }
            
        </div>
      

    </div>
  )
}

export default Dropdown2;