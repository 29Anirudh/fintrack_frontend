const ProfileCard = ({profile}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="flex justify-start gap-6 w-full">
        <div className="bg-blue-300 rounded-full w-16 h-16 flex justify-center items-center text-3xl text-black ">
            {profile.userDetails.fullName.substring(0,1)}
        </div>
        <div className="flex flex-col">
            <span>{profile.userDetails.fullName}</span>
            <span>{profile.userDetails.email}</span>
            {profile.userDetails.isVerifiedAccount ?(<span className="text-green-500 bg-green-600/10">Verified Account</span>):(<button className="text-red-600 bg-red-500/20 w-[50%] px-2 rounded-xl flex items-center justify-center hover:scale-[1.02] ">Verify Now</button>)}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
