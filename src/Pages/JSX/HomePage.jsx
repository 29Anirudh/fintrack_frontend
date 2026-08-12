import React, { useEffect, useState } from 'react'
import Header from '../../Components/JSX/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import transaction_icon from '../../assets/transaction_icon.jpeg'
import bank_icon from '../../assets/bank-icon.png'
import balance_icon from '../../assets/balance.jpeg'
import HomePageBasicCard from '../../Components/JSX/HomePageBasicCard'
import PieChartDashBoard from '../../Components/JSX/PieChartDashBoard'
import BarChartDashboard from '../../Components/JSX/BarChartDashboard'
import { ResponsiveContainer } from 'recharts'
import QuickActions from '../../Components/JSX/QuickActions'
import RecentTransactionCard from '../../Components/JSX/RecentTransactionCard'
import { motion } from 'framer-motion'
import LoadingPage from '../../Components/LoadingPage'

const HomePage = ({ userDetails, setUserDetails }) => {

    const nav = useNavigate();
    const [loading, setLoading] = useState(true)
    const [dashboardDetails, setDashboardDetails] = useState(null)
    const token = localStorage.getItem("token")
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setDashboardDetails(res.data.list))
            .catch((err) => console.error(err.response.data))
            .finally(() => setLoading(false))
    }, [])

    const basicCards = [
        {
            icon: bank_icon,
            text: "Total Accounts",
            numb: dashboardDetails?.basic?.totalAccountsCount ?? 0
        },
        {
            icon: balance_icon,
            text: "Total Balance",
            numb: dashboardDetails?.basic?.totalBalance ?? 0
        },
        {
            icon: transaction_icon,
            text: "Transactions",
            numb: dashboardDetails?.basic?.transactionsCount ?? 0
        }
    ]
    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        userDetails && dashboardDetails && (
            <motion.div initial={{ opacity: 0.6, y: 20 }} animate={{ opacity: 1, y: 0 }} duration={0.5} className='text-slate-50 pt-[70px] pb-[100px] p-2'>
                <h1 className='font-semibold text-sm  text-slate-300 p-2'>OVERVIEW</h1>
                <div className='flex flex-col w-full gap-5 items-center'>
                    {
                        basicCards.map((cardDetails, id) => (
                            <div key={id}>
                                <HomePageBasicCard id={id} icon={cardDetails.icon} text={cardDetails.text} number={cardDetails.numb} />
                            </div>
                        ))
                    }
                </div>
                <h1 className='font-semibold text-slate-300 text-sm p-2'>ANALYTICS</h1>
                <div className=' p-5 flex flex-col bg-slate-900/55 border border-slate-800 rounded-xl items-center justify-center'>
                    <div className='w-full flex justify-start'><h1 className='font-semibold text-xl'>Debits vs Credits</h1></div>
                    <div className='p-8 pb-0 w-full'><PieChartDashBoard debitandcredit={dashboardDetails.debitsandcredits} /></div>
                </div>
                <div className=' p-5 flex flex-col bg-slate-900/55 gap-10 border border-slate-800 rounded-xl items-center justify-center mt-5'>
                    <div className='w-full flex justify-start'><h1 className='font-semibold text-xl'>Monthly Overview</h1></div>
                    {dashboardDetails.monthlyoverview.length === 0 ? (
                        <h1 className='text-slate-400 text-sm font-semibold'>No data available</h1>
                    ) : (
                        <div className='w-full h-[300px]'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChartDashboard data={dashboardDetails.monthlyoverview} />
                            </ResponsiveContainer>
                        </div>
                    )}

                </div>
                <h1 className='font-semibold text-slate-300 text-sm p-2'>QUICK ACTIONS</h1>
                <QuickActions />
                <div className='p-2 px-5 flex min-h-36 flex-col bg-slate-900/55 gap-5 border border-slate-800 rounded-xl items-center justify-start mt-5 shadow-lg shadow-white/5'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='font-semibold text-xl'>Recent Transactions</h1>
                        <h1 className='font-semibold text-violet-500' onClick={()=>{nav('/transactions')}}>View All</h1>
                    </div>
                    {dashboardDetails.topten.length === 0 ? (
                        <h1 className='text-slate-400 text-sm font-semibold'>No transactions found.</h1>
                    ) : (
                        <div className='w-full flex flex-col gap-4'>
                            {dashboardDetails.topten?.map((transaction, id) => (
                                <RecentTransactionCard transaction={transaction} key={id} />
                        ))}
                    </div>)}
                </div>
            </motion.div>
        )
    )

}

export default HomePage
