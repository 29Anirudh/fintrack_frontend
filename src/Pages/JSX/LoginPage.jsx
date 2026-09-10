import React, { useEffect, useState } from 'react'
import Icon from '../../Components/JSX/Icon'
import EmailAddress from '../../Components/JSX/EmailAddress'
import Password from '../../Components/JSX/Password'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const LoginPage = () => {
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setUserDetails(null);
            toast.loading("Deleting token and logging out...")
            localStorage.removeItem("token");
            toast.success("Logged out successfully")
        }
    },[])

    const [signingIn,setSigningIn]=useState(false)
    const nav = useNavigate();

    const [message, setMessage] = useState({
        email: "",
        password: ""
    })

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [response, setResponse] = useState(null)

    function handleChanges() {
        let newMessage = { email: "", password: "" }
        let flag = 0;

        if (userDetails.email.trim().length === 0) {
            newMessage.email = "Email Required";
            flag = 1
        }

        if (userDetails.password.trim().length === 0) {
            newMessage.password = "Password Required";
            flag = 1
        }

        setMessage(newMessage)

        if (flag === 1) {
            return false;
        }

        return true;
    }

    function handlelogin() {
        if (handleChanges()) {
            setSigningIn(true)
            setErrorMessage("")
            setResponse(null)
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/user/validate`,
                    userDetails
                )
                .then((res) => {
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("token", res.data.token);
                    toast.success("Logged In")
                    nav("/")
                })
                .catch((err) => {
                    setErrorMessage(err)
                }).finally(()=>setSigningIn(false))
        }
    }

    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.12
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return (
        <div className='h-full flex flex-col items-center justify-center gap-5 text-slate-200'>

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                <Icon />
            </motion.div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='flex flex-col items-start w-full gap-6'
            >

                {/* Heading */}
                <motion.div
                    variants={itemVariants}
                    className='px-8'
                >
                    <h1 className='font-semibold text-xl'>
                        Welcome back
                    </h1>

                    <p className='text-sm text-slate-400 font-semibold mt-1'>
                        Sign in to access your financial dashboard
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    variants={itemVariants}
                    className='w-full flex justify-center'
                >
                    <motion.div
                        variants={containerVariants}
                        className='w-[85%] flex flex-col gap-5 items-center justify-center'
                    >

                        {/* Email */}
                        <motion.div
                            variants={itemVariants}
                            className='w-full flex flex-col items-start'
                        >
                            <EmailAddress
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />

                            <AnimatePresence mode="wait">
                                {message.email.length !== 0 && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                            y: -5
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            y: -5
                                        }}
                                        transition={{
                                            duration: 0.2
                                        }}
                                        className='text-red-300 font-semibold text-sm mt-1 overflow-hidden'
                                    >
                                        {message.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            variants={itemVariants}
                            className='w-full flex flex-col items-start'
                        >
                            <Password
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />

                            <AnimatePresence mode="wait">
                                {message.password.length !== 0 && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                            y: -5
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            y: -5
                                        }}
                                        transition={{
                                            duration: 0.2
                                        }}
                                        className='text-red-300 font-semibold text-sm mt-1 overflow-hidden'
                                    >
                                        {message.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Sign In Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -2
                            }}
                            whileTap={{
                                scale: 0.97
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20
                            }}
                            className='px-2 py-3 rounded-lg font-semibold bg-sky-600 w-full shadow-lg shadow-sky-900/20'
                            onClick={handlelogin}
                        >
                            {signingIn?"Signing In":"Sign In"} <span className='inline-block'>→</span>
                        </motion.button>

                        {/* Create Account */}
                        <motion.p
                            variants={itemVariants}
                            className='text-slate-400 text-sm font-semibold'
                        >
                            Don't have an account?{" "}

                            <motion.span
                                whileHover={{
                                    scale: 1.05,
                                    color: "#93c5fd"
                                }}
                                transition={{
                                    duration: 0.15
                                }}
                                className='text-blue-300 cursor-pointer inline-block'
                                onClick={() => nav("/signup")}
                            >
                                Create one
                            </motion.span>
                        </motion.p>

                        {/* Login Error */}
                        <AnimatePresence mode="wait">
                            {errorMessage.length !== 0 && (
                                <motion.p
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
                                    transition={{
                                        duration: 0.25
                                    }}
                                    className='text-red-300 text-xs font-semibold text-center'
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Success Response */}
                        <AnimatePresence mode="wait">
                            {response !== null &&
                                response.data.role !== "" && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: 8
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 8
                                        }}
                                        transition={{
                                            duration: 0.3
                                        }}
                                        className='text-green-200 text-sm font-semibold'
                                    >
                                        You are assigned with {response.data.role} role.
                                    </motion.p>
                                )}
                        </AnimatePresence>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default LoginPage