const ConfirmationBox = ({confirmMsg,deleteAccount,deleting,setShowDeleteConfirmationBox,reloadAccounts}) => {
  return (
    <div className='bg-slate-900/10 flex flex-col gap-6 p-4'>
      <h1 className="text-2xl text-red-500">Confirmation Box</h1>
      <p className="font-semibold">{confirmMsg}</p>
      <div className="flex gap-10">
        <button className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded-lg" onClick={()=>{deleteAccount();setShowDeleteConfirmationBox(false);reloadAccounts();}}>{deleting?"Deleting":"Delete"}</button>
        <button className="bg-white text-black hover:text-white hover:bg-slate-800 px-6 py-2 rounded-lg" onClick={()=>setShowDeleteConfirmationBox(false)}>No</button>
      </div>
    </div>
  )
}

export default ConfirmationBox
