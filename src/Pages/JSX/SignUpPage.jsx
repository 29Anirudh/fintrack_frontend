import React, { useState } from 'react'
import Icon from '../../Components/JSX/Icon'
import SignUpStepper from '../../Components/JSX/SignUpStepper'
import FullName from '../../Components/JSX/FullName'
import EmailAddress from '../../Components/JSX/EmailAddress'
import DateOfBirth from '../../Components/JSX/DateOfBirth'
import Password from '../../Components/JSX/Password'
import axios from 'axios'
import SignUpStepLines from '../../Components/JSX/SignUpStepLines'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const SignUp = () => {
    const nav = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        dateofbirth: "",
        status: "USER"
    });

    const [stepCount, setStepCount] = useState(1);
    const [message, setMessage] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [buttonText, setButtonText] = useState("Create");

    const steps = [
        {
            id: 1,
            component: (
                <FullName
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                />
            )
        },
        {
            id: 2,
            component: (
                <EmailAddress
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                />
            )
        },
        {
            id: 3,
            component: (
                <DateOfBirth
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                />
            )
        },
        {
            id: 4,
            component: (
                <Password
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                />
            )
        },
    ];

    function handleNextStep() {
        if (stepCount === 1) {
            if (userDetails.name.trim().length === 0) {
                setMessage("Name should not be empty");
                return false;
            }
        }

        else if (stepCount === 2) {
            const emailid = userDetails.email;
            const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailid.length === 0) {
                setMessage("Email should not be empty");
                return false;
            }

            if (!regexp.test(emailid)) {
                setMessage("Email should be in correct format.");
                return false;
            }
        }

        else if (stepCount === 3) {
            if (userDetails.dateofbirth.length === 0) {
                setMessage("Date of birth should not be empty.");
                return false;
            }
        }

        else if (stepCount === 4) {
            if (userDetails.password.length === 0) {
                setMessage("Password should not be empty.");
                return false;
            }

            setMessage("");
            return true;
        }

        setMessage("");

        setStepCount((prev) => prev + 1);

        return true;
    }

    function handlePreviousStep() {
        setStepCount((prev) => prev - 1);
        setMessage("");
        setSignUpError("");
        setSignUpMessage("");
    }

    function handleSignUp() {
        const isValid = handleNextStep();

        if (!isValid) return;

        setButtonText("Creating...");
        setSignUpError("");
        setSignUpMessage("");

        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/user/create`,
                userDetails
            )
            .then((res) => {
                setSignUpMessage(res.data.msg);
                toast.success("Signed Up successfully");

                setButtonText("Created");

                setTimeout(() => {
                    nav("/");
                }, 700);
            })
            .catch((err) => {
                setSignUpError(
                    err.response?.data?.msg || "Something went wrong"
                );

                setButtonText("Try again");
            });
    }

    const stepVariants = {
        initial: {
            opacity: 0,
            x: 40,
            filter: "blur(6px)"
        },
        animate: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)"
        },
        exit: {
            opacity: 0,
            x: -40,
            filter: "blur(6px)"
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='h-full flex flex-col items-start gap-4 justify-center text-slate-200'
        >
            {/* Logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 180
                }}
                className='flex w-full justify-center'
            >
                <Icon />
            </motion.div>

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.15
                }}
                className='flex flex-col items-start gap-4 justify-center w-full border-2 rounded-2xl border-white/10 px-1 py-4 shadow-md shadow-gray-800 overflow-hidden'
            >
                {/* Heading */}
                <motion.div
                    layout
                    className='w-full'
                >
                    <h1 className='text-xl font-semibold px-8'>
                        Create your account
                    </h1>

                    <h3 className='text-sm font-semibold px-8 text-slate-400'>
                        Step{" "}
                        <motion.span
                            key={stepCount}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='inline-block text-violet-200'
                        >
                            {stepCount}
                        </motion.span>
                        {" "}of{" "}
                        <span className='text-violet-100'>
                            {steps.length}
                        </span>
                    </h3>
                </motion.div>

                {/* Progress */}
                <SignUpStepLines currentStep={stepCount} />

                {/* Step Content */}
                <div className='w-full overflow-hidden'>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={stepCount}
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{
                                duration: 0.35,
                                ease: "easeOut"
                            }}
                            className='flex flex-col w-full items-center gap-3 justify-center'
                        >
                            <SignUpStepper
                                step={steps[stepCount - 1]}
                                userDetails={userDetails}
                            />

                            {/* Validation Message */}
                            <AnimatePresence mode="wait">
                                {message && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -8
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -8
                                        }}
                                        className='w-[85%]'
                                    >
                                        <p className='text-red-400 text-sm'>
                                            {message}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Buttons */}
                            {stepCount === 1 ? (
                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow:
                                            "0px 10px 25px rgba(14,165,233,0.25)"
                                    }}
                                    whileTap={{
                                        scale: 0.97
                                    }}
                                    className='px-2 py-3 rounded-lg font-semibold bg-sky-600 w-[85%]'
                                    onClick={handleNextStep}
                                >
                                    Continue →
                                </motion.button>
                            ) : stepCount < 4 ? (
                                <div className='w-[85%] flex gap-2'>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        className='px-2 py-3 rounded-lg font-semibold bg-slate-500 w-[50%]'
                                        onClick={handlePreviousStep}
                                    >
                                        Back
                                    </motion.button>

                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow:
                                                "0px 10px 25px rgba(14,165,233,0.25)"
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        className='px-2 py-3 rounded-lg font-semibold bg-sky-600 w-[50%]'
                                        onClick={handleNextStep}
                                    >
                                        Continue →
                                    </motion.button>
                                </div>
                            ) : (
                                <div className='w-[85%] flex gap-2'>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        className='px-2 py-3 rounded-lg font-semibold bg-slate-500 w-[50%]'
                                        onClick={handlePreviousStep}
                                    >
                                        Back
                                    </motion.button>

                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow:
                                                "0px 10px 25px rgba(14,165,233,0.25)"
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={buttonText === "Creating..."}
                                        className='px-2 py-3 rounded-lg font-semibold bg-sky-600 w-[50%] disabled:opacity-60'
                                        onClick={handleSignUp}
                                    >
                                        {buttonText}
                                    </motion.button>
                                </div>
                            )}

                            {/* Signup Result */}
                            <AnimatePresence>
                                {(signUpError || signUpMessage) && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        className='text-sm font-semibold'
                                    >
                                        {signUpError ? (
                                            <p className='text-red-500'>
                                                {signUpError}
                                            </p>
                                        ) : (
                                            <p className='text-green-300'>
                                                {signUpMessage}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SignUp;