import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import TransactionCardWithFullDetails from '../../Components/JSX/TransactionCardWithFullDetails'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import LoadingPage from '../../Components/LoadingPage'
import { BsSearch } from 'react-icons/bs'

const TransactionsPage = ({ setCurrentBankAccount }) => {
  const [buttonNum, setButtonNum] = useState(1)
  const [transactionDetails, setTransactionDetails] = useState(null)
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("")
  const [overview, setOverview] = useState({ credit_money: 0, debit_money: 0, net_money: 0 })
  const token = localStorage.getItem("token")
  
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    reloadTransactions();
  }, [])
  async function reloadTransactions() {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTransactionDetails(res.data.list)
      setOverview(res.data.overview)
    }
    catch (err) {
      toast.error(err.response.data.msg)
    }
    finally{
      setLoading(false)
    }
  }
  const analytics = [
    {
      title: "CREDIT",
      value: `₹${overview.credit_money}`
    },
    {
      title: "DEBIT",
      value: `₹${overview.debit_money}`
    },
    {
      title: "NET",
      value: `₹${overview.credit_money - overview.debit_money}`
    },
  ]

  const filteredTransactions = transactionDetails?.filter((transaction) => {
    const searchB = transaction.description.toLowerCase().includes(searchKey.toLowerCase());
    const matchesType =
      buttonNum === 1 ||
      (buttonNum === 2 && transaction.transactionType === "CREDIT") ||
      (buttonNum === 3 && transaction.transactionType === "DEBIT")
    return searchB && matchesType
  })

  if(loading){
    return(
      <LoadingPage/>
    )
  }
  return (
    <div className='min-h-[calc(100vh-300px)] mt-[70px] pb-[100px] px-4 text-white flex flex-col gap-2  relative'>
      <h1 className='text-2xl font-bold w-full'>Transactions</h1>
      <motion.div className='w-full flex flex-col gap-4' initial={{ opacity: 0,y: 20 }} animate={{ opacity: 1,y: 0 }} transition={{ duration: 0.5 }}>
        <div className='flex justify-between backdrop-blur-lg p-4 bg-white/10 rounded-lg w-full border border-slate-500'>
          {analytics.map((analytic, index) => (
            <div className={`flex flex-col p-1 pr-8 justify-center items-center gap-2 ${analytic.title!=="NET"?"border-r border-white/10":""}`} key={index} >
              <span className='text-md text-slate-500'>{analytic.title}</span>
              <span className={`text-2xl font-bold ${analytic.title === "CREDIT" ? "text-green-600" : analytic.title === "DEBIT" ? "text-red-700" : (analytic.title === "NET" && analytic.value >= 0) ? "text-green-600" : "text-red-700"}`}>{analytic.value}</span>
              {(analytic.title === "CREDIT" || (analytic.title === "NET" && analytic.value >= 0)) ? <div className='text-green-600 ring-1 ring-green-600 rounded-full bg-green-500/20 w-6 h-6 flex justify-center items-center p-2'><FaLongArrowAltDown size={20}/></div> : (<div className='text-red-700 ring-1 ring-red-600 rounded-full bg-red-500/20 w-6 h-6 flex justify-center items-center p-2'><FaLongArrowAltUp/></div>)}
            </div>
          ))}
        </div>
        <div className='flex w-full bg-transparent border border-white/10 rounded-xl focus-within:scale-105 focus-within:shadow-sm focus-within:shadow-violet-400  transition-all'>
          <div className='w-[10%] flex justify-center items-center text-violet-800 font-semibold'><BsSearch/></div>
          <input
            type='text'
            className='bg-transparent w-[90%] placeholder:text-sm p-2 outline-none '
            placeholder='Search your transactions'
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <div className='flex gap-2 w-full'>
          <div className='w-[70%] flex justify-between bg-white/10 rounded-xl'>
            <button className={`w-[30%] rounded-xl pl-2 pr-2 p-1 shadow-sm transition-all ${buttonNum === 1 ? "bg-violet-500 font-semibold" : ""}`} onClick={() => setButtonNum(1)}>
              All
            </button>
            <button className={`w-[30%] rounded-xl pl-2 pr-2 p-1 shadow-sm transition-all ${buttonNum === 2 ? "bg-violet-500 font-semibold" : ""}`} onClick={() => setButtonNum(2)}>
              Credit
            </button>
            <button className={`w-[30%] rounded-xl pl-2 pr-2 p-1 shadow-sm transition-all ${buttonNum === 3 ? "bg-violet-500 font-semibold" : ""}`} onClick={() => setButtonNum(3)}>
              Debit
            </button>
          </div>
        </div>
        {(filteredTransactions && filteredTransactions.length > 0) ? filteredTransactions.map((transaction,index) => (
          <TransactionCardWithFullDetails key={index} transaction={transaction} setCurrentBankAccount={setCurrentBankAccount} />
        )) : (
          <h1 className='text-lg text-slate-400 mt-4'>No Transactions found for you</h1>
        )}
      </motion.div>

      <div className='fixed right-4 p-4 bottom-20 rounded-full shadow-lg shadow-violet-500 hover:scale-[1.03] bg-violet-500 text-white' onClick={() => navigate('/transactions/add')}>
        <FaPlus />
      </div>

    </div>
  )
}

export default TransactionsPage
