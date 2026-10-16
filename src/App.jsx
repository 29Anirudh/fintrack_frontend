import { useEffect, useState } from 'react'

import './App.css'
import SignUp from './Pages/JSX/SignUpPage'
import LoginPage from './Pages/JSX/LoginPage'
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import HomePage from './Pages/JSX/HomePage'
import toast, { Toaster } from 'react-hot-toast'
import Header from './Components/JSX/Header'
import Footer from './Components/JSX/Footer'
import AccountsPage from './Pages/JSX/AccountsPage'
import TransactionsPage from './Pages/JSX/TransactionsPage'
import ProfilePage from './Pages/JSX/ProfilePage'
import EachAccountPage from './Pages/JSX/EachAccountPage'
import ViewEditTransaction from './Pages/JSX/EditTransaction'
import axios from 'axios'
import LoadingPage from './Components/LoadingPage'
import FriendsPage from './Pages/JSX/FriendsPage'
import ExpenseSplit from './Pages/ExpenseSplit'
import ExpenseSplitEach from './Pages/ExpenseSplitEach'
import ExpenseSplitNew from './Pages/ExpenseSplitNew'


function App() {
  const [userDetails, setUserDetails] = useState(null)
  const [currentBankAccount, setCurrentBankAccount] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  function isTokenExpired(token) {
    if (!token) return true
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      )
      return payload.exp * 1000 < Date.now()
    } catch (error) {
      return true
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
        location.pathname === "/login" ||
        location.pathname === "/signup"
    ) {
        setAuthLoading(false);
        return;
    }
    if (!token) {
        setUserDetails(null);
        setAuthLoading(false);
        navigate("/login", { replace: true });
        return;
    }
    if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        setUserDetails(null);
        setAuthLoading(false);
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
    }
    if (userDetails) {
        setAuthLoading(false);
        return;
    }
    setAuthLoading(true);
    axios
        .get(
            `${import.meta.env.VITE_BACKEND_URL}/user/getuser`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((res) => {
            setUserDetails(res.data.data);
        })
        .catch((err) => {
            toast.error(
                "Failed to fetch user: " +
                (err.response?.data?.message || "Unknown error")
            );

            localStorage.removeItem("token");
            setUserDetails(null);

            navigate("/login", { replace: true });
        })
        .finally(() => {
            setAuthLoading(false);
        });

}, [location.pathname, navigate, userDetails]);

  if (authLoading) {
    return (
      <LoadingPage/>
    )
  }

  return (
    <div className="font-plex">

      <Routes>

        <Route
          path="/*"
          element={
            <MainApp
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              currentBankAccount={currentBankAccount}
              setCurrentBankAccount={setCurrentBankAccount}
            />
          }
        />

      </Routes>

    </div>
  )
}


function MainApp({
  userDetails,
  setUserDetails,
  currentBankAccount,
  setCurrentBankAccount
}) {

  return (

    <div className="h-screen ">

      {userDetails && userDetails.name && (
        <Header username={userDetails.name} />
      )}

      <Toaster />

      <Routes>

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/"
          element={
            <HomePage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />

        <Route
          path="/accounts"
          element={<AccountsPage />}
        />

        <Route
          path="/accounts/:id"
          element={<EachAccountPage />}
        />

        <Route
          path="/transactions"
          element={
            <TransactionsPage
              setCurrentBankAccount={setCurrentBankAccount}
            />
          }
        />

        <Route
          path="/transactions/view/:id"
          element={
            <ViewEditTransaction
              accountid={currentBankAccount}
              update={0}
            />
          }
        />

        <Route
          path="/transactions/add"
          element={
            <ViewEditTransaction />
          }
        />

        <Route 
          path='/splits'
          element={
            <ExpenseSplit/>
          }
        />

        <Route path='/splits/:id' element={<ExpenseSplitEach/>}/>

        <Route path='/splits/new' element={<ExpenseSplitNew update={0} />}/>


        <Route
          path="/transactions/edit/:id"
          element={
            <ViewEditTransaction
              accountid={currentBankAccount}
              update={1}
            />
          }
        />

        <Route 
          path='/friends'
          element={<FriendsPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

      </Routes>

      {userDetails && <Footer />}

    </div>
  )
}


export default App