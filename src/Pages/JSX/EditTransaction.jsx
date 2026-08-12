import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";
import { TbNotes } from "react-icons/tb";
import CategoryPicker from '../../Components/Transactions/CategoryPicker';
import { FaBullseye } from 'react-icons/fa';
import LoadingPage from '../../Components/LoadingPage';

const ViewEditTransaction = ({ update = 0 }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const currentBankAccount = location.state?.currentBankAccount;

    const [retrieving,setRetrieving]=useState(false)

    const categories = [
        "MOVIE",
        "MUSIC",
        "FOOD",
        "TRANSPORTATION",
        "SHOPPING",
        "HEALTHCARE",
        "EDUCATION",
        "OTHER"
    ];

    const navigate = useNavigate();

    const token = localStorage.getItem("token")

    const [buttonNUm, setButtonNum] = useState(2);
    const [basicAccountDetails, setBasicAccountDetails] = useState(null)
    const [message, setMessage] = useState(null)
    const [dropdownopen, setDropdownopen] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState({
        accountname: "",
        maskedAccountid: ""
    })
    const [transactionDetails, setTransactionDetails] = useState({
        fromAccountno: "",
        amount: 0,
        transactiontime: "",
        type: "CREDIT",
        category:"",
        description: ""
    })

    function onCategoryChange(selectedCategory) {
        setTransactionDetails({ ...transactionDetails, category: selectedCategory })
    }
    useEffect(() => {
        if (token != null) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/basicdetails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setBasicAccountDetails(res.data.details)
            }).catch((err) => console.error(err.response.data.msg));
            //For filling the details prior in case of editing
            if (update === 1 && currentBankAccount != null && id != null) {
                setRetrieving(true)
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/getbyid/acc/${currentBankAccount}/tran/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    setTransactionDetails({
                        fromAccountno: res.data.transaction.accountno,
                        transactiontime: res.data.transaction.transactiontime,
                        amount: res.data.transaction.amount,
                        type: res.data.transaction.transactionType,
                        category: res.data.transaction.category,
                        description: res.data.transaction.description
                    });
                    setButtonNum(res.data.transaction.transactionType === "DEBIT" ? 1 : 2)
                    setSelectedAccount({
                        accountname: res.data.transaction.bankname,
                        maskedAccountid: res.data.transaction.accountno
                    })
                }).catch((err) => toast.error(err.response.data.msg))
                .finally(()=>{
                    setRetrieving(false)
                })
            }
        }
    }, [])
    function handleMessage() {
        if (!message) return;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/transactions/getinfo`,
            {
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            setTransactionDetails({
                fromAccountno: res.data.data.accountno,
                transactiontime: res.data.data.transactiondate,
                amount: res.data.data.amount,
                type: res.data.data.type,
                category: "",
                description: ""
            })
            setButtonNum(res.data.data.type === "DEBIT" ? 1 : 2)
            setSelectedAccount(basicAccountDetails.find((account) => account.maskedAccountid === res.data.data.accountno))
        }).catch((err) => toast.error(err.response.data.msg))
    }
    function handleUpdateOrCreate() {
        setLoading(true);
        if (update === 0) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/transactions/create/${transactionDetails.fromAccountno}`, transactionDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                toast.success(res.data.msg)
                setLoading(false);
                navigate("/transactions")
            }).catch((err) => {
                toast.error(err.response.data.msg)
                setLoading(false);
            })
        } else if (update === 1) {
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/transactions/update/${transactionDetails.fromAccountno}`,
                {
                    transactionId: id,
                    fromAccountno: transactionDetails.fromAccountno,
                    amount: transactionDetails.amount,
                    transactiontime: transactionDetails.transactiontime,
                    category: transactionDetails.category,
                    type: transactionDetails.type,
                    description: transactionDetails.description
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                toast.success(res.data.msg)
                setLoading(false);
                navigate("/transactions")
            }).catch((err) => {
                toast.error(err.response.data.msg)
                setLoading(false);
            }
            )
        }
    }

    if(retrieving){
        return(<LoadingPage/>)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-[70px] pb-[100px] text-white relative flex flex-col gap-2 w-full p-3 items-center'>
            <div className='flex items-center justify-start w-full gap-3'>
                <div className='bg-gradient-to-br from-violet-500/30 to-violet-900/30 ring-1 ring-violet-400/50 shadow-[0_0_30px_rgba(138,83,224,0.45)] w-14 h-14 p-4 flex items-center rounded-full'><TbNotes size={30} /></div>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-semibold text-start w-full'>{update === 0 ? "Create Transaction" : "Edit Transaction"}</h1>
                    <p className='text-sm text-slate-400'>{update === 0 ? "Fill in the details to create a new transaction" : "Edit the transaction details below"}</p>
                </div>
            </div>

            <div className='w-full flex border border-violet-700/10 mt-3'/>
            
            {update === 0 &&
                <div className='w-full flex flex-col gap-1'>
                    <h3 className='text-slate-400'>Message</h3>
                    <textarea
                        rows={4}
                        className='rounded bg-white/10 p-2 placeholder:text-sm font-semibold outline-none focus:shadow-[0_1px_3px_rgba(138,83,224)] transition-all focus:border-violet-200'
                        placeholder='Copy your bank transaction message and paste here'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className='bg-violet-950 rounded-md p-2 font-semibold' onClick={handleMessage}>Get Data</button>
                </div>

            }
            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-slate-400'>Type</h3>
                <div className='flex w-full justify-between text-slate-200 bg-white/10 rounded cursor-pointer'>
                    <span
                        className={`w-[50%] flex items-center justify-center rounded p-1 transition-all ${buttonNUm === 1 ? "bg-red-800" : ""}`}
                        onClick={() => {
                            setButtonNum(1);
                            setTransactionDetails({ ...transactionDetails, type: "DEBIT" })
                        }}
                    >
                        <BsArrowUp size={13} /> Debit
                    </span>
                    <span
                        className={`w-[50%] flex items-center justify-center rounded p-1 transition-all ${buttonNUm === 2 ? "bg-green-700" : ""}`}
                        onClick={() => {
                            setButtonNum(2);
                            setTransactionDetails({ ...transactionDetails, type: "CREDIT" })
                        }}
                    >
                        <BsArrowDown size={13} /> Credit
                    </span>
                </div>
            </div>
            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-slate-400'>Amount</h3>
                <div className='flex w-full border rounded bg-white/10 p-2 font-semibold  transition-all border-transparent focus:border-violet-200'>
                    <span className='bg-transparent rounded p-2 flex items-center justify-center w-[5%]'>₹</span>
                    <div className='w-[2px] bg-white/10 mx-2'/>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        className='placeholder:text-sm bg-transparent outline-none w-[94%]'
                        placeholder='In Rupees'
                        value={transactionDetails?.amount}
                        onChange={(e) => setTransactionDetails({ ...transactionDetails, amount: e.target.value })}
                    />
                </div>
                
            </div>
            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-slate-400'>Category</h3>
                <CategoryPicker defaultOption='Select a category' options={categories} selectedOption={transactionDetails?.category} onOptionSelect={onCategoryChange} />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-slate-400'>Description</h3>
                <textarea
                    rows={4}
                    className=' border rounded bg-white/10 p-2 placeholder:text-sm font-semibold outline-none transition-all border-transparent focus:border-violet-200'
                    placeholder='Purpose of transaction'
                    value={transactionDetails?.description}
                    onChange={(e) => setTransactionDetails({ ...transactionDetails, description: e.target.value })}
                />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-slate-400'>Date</h3>
                <input
                    type='date'
                    className='date-input border rounded text-slate-200 bg-white/10 p-2 placeholder:text-sm font-semibold outline-none transition-all border-transparent focus:border-violet-200'
                    value={transactionDetails?.transactiontime}
                    onChange={(e) => setTransactionDetails({ ...transactionDetails, transactiontime: e.target.value })}
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <h3 className="text-slate-400">Account</h3>

                <div className="relative w-full">

                    {/* Selected Account */}
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDropdownopen(!dropdownopen)}
                        className="flex w-full items-center justify-between rounded border border-white/10 bg-white/5 p-3 text-left outline-none transition-all hover:border-violet-400/50 focus:shadow-lg focus:shadow-violet-400/10"
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
                                            setTransactionDetails({
                                                ...transactionDetails,
                                                fromAccountno: account.maskedAccountid
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
            </div>            
            <button
                className='w-full p-2 font-semibold bg-blue-500 rounded hover:scale-95 transition-all'
                onClick={() => handleUpdateOrCreate()}
            >{update === 0 ? (loading ? "Creating..." : "Create") : (loading ? "Updating..." : "Update")}</button>
        </motion.div>
    )
}

export default ViewEditTransaction
