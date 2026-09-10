import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "motion/react";
import BankAccountCard from '../../Components/JSX/BankAccountCard'
import { FaPlus } from "react-icons/fa";
import BankCreateCard from '../../Components/JSX/BankCreateCard'
import ConfirmationBox from '../../Components/JSX/ConfirmationBox';
import LoadingPage from '../../Components/LoadingPage';

const AccountsPage = () => {
    const [accountDetails, setAccountDetails] = useState(null)
    const nav = useNavigate();
    const [buttonNum, setButtonNum] = useState(1)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [showDeleteConfirmationBox, setShowDeleteConfirmationBox] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleting, setDeleting] = useState(false)
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        reloadAccounts();
    }, [accountDetails])

    async function reloadAccounts() {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/accounts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setAccountDetails(res.data.list))
            .catch((err) => {
                toast.error(err.response.data.msg);
                nav("/login")
            }).finally(() => setLoading(false))
    }

    async function deleteAccount() {
        if (!token) {
            toast.error("Token expired!");
            nav("/login");
            return;
        }
        setDeleting(true);
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/account/delete/${deleteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(res.data?.msg || "Account deleted successfully");
            setShowDeleteConfirmationBox(false);
            setDeleteId("");
            await reloadAccounts();
        } catch (err) {
            toast.error(
                err.response?.data?.msg || "Failed to delete account"
            );
        } finally {
            setDeleting(false);
        }
    }

    const filteredAccounts = accountDetails?.filter((account) => {
        if (buttonNum === 1) return true;
        if (buttonNum === 2) return account.status === "Active";
        if (buttonNum === 3) return account.status === "Inactive";
        return false;
    });

    if(loading){
        return(
            <LoadingPage/>
        )
    }
    return (
        <motion.div initial={{ opacity: 0,y:20 }} animate={{ opacity: 1,y:0 }} duration={0.5} className='min-h-[calc(100vh-200px)] mt-[100px] pb-[100px] text-slate-300 flex flex-col items-center gap-4 relative'>
            <div className='w-full text-start'>
                <h1 className='text-xl font-bold pl-2'>
                    My Accounts
                </h1>
                <span className='text-md font-semibold text-slate-400 pl-2'>{accountDetails && accountDetails.length} accounts linked</span>
            </div>
            <div className='w-[95%] flex justify-around bg-white/10 rounded-xl'>
                <button className={`w-[31%] rounded-xl p-2 shadow-sm  ${buttonNum === 1 ? "bg-sky-600 shadow-sky-400 font-semibold" : ""}`} onClick={() => setButtonNum(1)}>
                    All
                </button>
                <button className={`w-[32%] rounded-xl p-2 shadow-sm ${buttonNum === 2 ? "bg-sky-600 shadow-sky-400 font-semibold" : ""}`} onClick={() => setButtonNum(2)}>
                    Active
                </button>
                <button className={`w-[32%] rounded-xl p-2 shadow-sm ${buttonNum === 3 ? "bg-sky-600 shadow-sky-400 font-semibold" : ""}`} onClick={() => setButtonNum(3)}>
                    Inactive
                </button>
            </div>
            <div
                initial={{ opacity: 0.8, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.50, ease: "easeOut" }}
                className='flex-1 min-h-0 flex flex-col gap-5 justify-start items-center w-full overflow-y-auto pb-2 '>
                {filteredAccounts && filteredAccounts.length !== 0 ? (
                    filteredAccounts.map((account, index) => (
                        <BankAccountCard bankDetails={account} key={index} setDeleteId={setDeleteId} setShowConfirmationBox={setShowDeleteConfirmationBox} />
                    ))
                ) : (
                    <h1 className='text-lg text-slate-400 mt-10'>No Accounts found for you</h1>
                )}
            </div>
            <div className='fixed bottom-20 right-4 bg-violet-800 py-3 shadow-lg shadow-violet-500/30 rounded-xl w-14 h-14 flex justify-center items-center hover:scale-105 transition-all' onClick={() => setShowCreateAccount(true)}>
                <FaPlus size={20} />
            </div>
            <AnimatePresence>
                {(showCreateAccount) && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCreateAccount(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-[90%] max-w-lg"
                        >
                            <BankCreateCard
                                setShowCreateAccount={setShowCreateAccount}
                                reloadAccounts={reloadAccounts}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {(showDeleteConfirmationBox) && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDeleteConfirmationBox(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-[90%] max-w-lg border-2 rounded-2xl border-red-500"
                        >
                            <ConfirmationBox setShowDeleteConfirmationBox={setShowDeleteConfirmationBox} confirmMsg={`Do you want to delete this account ${deleteId}?`} deleteAccount={deleteAccount} deleting={deleting} reloadAccounts={reloadAccounts} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default AccountsPage
