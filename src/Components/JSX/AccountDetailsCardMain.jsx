import { BsBank } from 'react-icons/bs'

const AccountDetailsCardMain = ({account}) => {
  return (
    <div className='w-[90%] rounded-2xl flex flex-col gap-3 hover:scale-[1.01] transition-all bg-gradient-to-b from-violet-900 to-blue-800 relative p-2 pl-5 text-white'>
      <div className='flex w-full justify-between'>
        <div className='flex justify-center items-center gap-4'>
            <div  className='bg-white/10 text-sky-600 p-3 rounded-full'><BsBank color='white' size={20}/></div>
            <div className='flex flex-col justify-start'>
                <span className='font-semibold '>{account.bankname}</span>
                <span className='text-sm opacity-50'>{account.accountType}</span>
            </div>
            </div>
            <span className={`text-right absolute right-5 text-xs font-semibold p-2 border-2 border-transparent pt-1 pb-1 rounded-2xl ${account?.status==='Active'?"bg-green-600/30 border-green-900 ":"bg-red-600/30 border-red-600"}`}>{account.status}</span>
        </div>
        <div>
            <span className='text-sm opacity-40 font-semibold'>****  ****  **** {account.accountno.slice(account.accountno.length-4)}</span>
        </div>
        <div>
            <p className='text-xs opacity-50 font-semibold'>BALANCE</p>
            <span className='font-bold text-2xl'>₹{account.balance}</span>
        </div>
    </div>
  )
}

export default AccountDetailsCardMain
