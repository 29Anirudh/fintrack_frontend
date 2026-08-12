import React, { useState } from 'react'
import AccountTypeDropdown from './AccountTypeDropDown'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BankCreateCard = ({setShowCreateAccount,reloadAccounts}) => {
    const token=localStorage.getItem("token")
    const navigate=useNavigate();
    const [creating,setCreating]=useState(false);

    const [accountDetails, setAccountDetails] = useState({
        accountno: "",
        balance: 0,
        accountType: "",
        bankname: "",
        pin: ""
    })

    const [errorDetails, setErrorDetails] = useState({
        accountno: "",
        balance: "",
        accountType: "",
        bankname: "",
        pin: ""
    })

    function handleErrorCreatingAccount() {
        let flag = 0;

        const errors = {
            accountno: "",
            balance: "",
            accountType: "",
            bankname: "",
            pin: ""
        };

        if (!/^\d{8,}$/.test(accountDetails.accountno)) {
            errors.accountno =
                "Account Number should contain at least 8 digits";
            flag = 1;
        }

        if (accountDetails.balance < 0) {
            errors.balance = "Balance should be a positive number";
            flag = 1;
        }

        if (accountDetails.accountType.length === 0) {
            errors.accountType = "Please select account type";
            flag = 1;
        }

        if (accountDetails.bankname.trim().length === 0) {
            errors.bankname = "Please enter bank name";
            flag = 1;
        }

        if (!/^\d{4}$/.test(accountDetails.pin)) {
            errors.pin = "PIN should contain exactly 4 digits";
            flag = 1;
        }

        setErrorDetails(errors);

        return flag;
    }

    function handleCreateAccount() {
        if (handleErrorCreatingAccount()) {
            return;
        }
        if(!token){
            toast.error("Token expired")
            navigate("/login")
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/create`,accountDetails,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        ).then((res)=>{
            toast.success(res.data.msg);
            reloadAccounts();
            setShowCreateAccount(false);
        })
        .catch((err)=>toast.error(err.response.data.msg))
    }
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleCreateAccount();
        }} className='flex flex-col gap-4 w-[95%] p-5 bg-slate-400/10 shadow-lg  rounded-xl'>
            <h1 className='text-lg font-bold'>Create New Account</h1>
            <div>
                <h3>Account Number</h3>
                <span className='text-xs'>Keep the last 4 digits same as original account number</span>
                <input type='text' required className='w-full bg-transparent border border-white/10 rounded-xl placeholder:text-sm p-2 outline-none focus:scale-105 focus:shadow-sm focus:shadow-violet-400 transition-all' placeholder='Enter your account number' onChange={(e) => setAccountDetails({ ...accountDetails, accountno: e.target.value })} />
                {errorDetails.accountno && <span className='text-xs text-red-500'>{errorDetails.accountno}</span>}
            </div>

            <div>
                <h3>Account Type</h3>
                <AccountTypeDropdown accountDetails={accountDetails} setAccountDetails={setAccountDetails} />
                {errorDetails.accountType && <span className='text-xs text-red-500'>{errorDetails.accountType}</span>}
            </div>
            <div>
                <h3>Bank Name</h3>
                <input type='text' required className='w-full bg-transparent border border-white/10 rounded-xl placeholder:text-sm p-2 outline-none focus:scale-105 focus:shadow-sm focus:shadow-violet-400 transition-all' placeholder='Enter your bank name' onChange={(e) => setAccountDetails({ ...accountDetails, bankname: e.target.value })} />
                {errorDetails.bankname && <span className='text-xs text-red-500'>{errorDetails.bankname}</span>}
            </div>
            <div>
                <h3>Balance(₹)</h3>
                <input type='text' required autoComplete='off' className='w-full bg-transparent border border-white/10 rounded-xl placeholder:text-sm p-2 outline-none focus:scale-105 focus:shadow-sm focus:shadow-violet-400 transition-all' placeholder='Enter your balance' onChange={(e) => setAccountDetails({ ...accountDetails, balance: Number(e.target.value) })} />
                {errorDetails.balance && <span className='text-xs text-red-500'>{errorDetails.balance}</span>}
            </div>
            <div>
                <h3>Pin(4 digits only)</h3>
                <input type='password' required autoComplete='new-password' className='w-full bg-transparent border border-white/10 rounded-xl placeholder:text-sm p-2 outline-none focus:scale-105 focus:shadow-sm focus:shadow-violet-400 transition-all' placeholder='Enter your pin' onChange={(e) => setAccountDetails({ ...accountDetails, pin: e.target.value })} />
                {errorDetails.pin && <span className='text-xs text-red-500'>{errorDetails.pin}</span>}
            </div>
            <button type='submit' className='bg-violet-500 p-2 rounded-xl hover:scale-105 transition-all' disabled={creating}>
                {creating ? "Creating..." : "Create Account"}
            </button>
        </form>
    )
}

export default BankCreateCard
