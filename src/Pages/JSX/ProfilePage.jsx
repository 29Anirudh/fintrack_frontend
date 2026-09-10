import React, { useEffect, useState } from 'react'
import ProfileCard from '../../Components/Profile/ProfileCard'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadingPage from '../../Components/LoadingPage'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    setLoading(true)
    const token=localStorage.getItem("token")
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => {
        toast.error("Cannot fetch profile")
        navigate("/")
      })
      .finally(() => setLoading(false))
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-[calc(100vh-200px)] mt-[80px] flex flex-col gap-4 p-5 text-white">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <span className="text-slate-300">
          Manage your account and preferences
        </span>
      </div>

      {profile && <ProfileCard profile={profile} />}
    </div>
  )
}

export default ProfilePage