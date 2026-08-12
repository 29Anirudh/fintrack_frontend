import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import money_icon from '../../public/money_loading_img.png'
const LoadingPage = () => {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
        <motion.div animate={{
            y:[0,10,0]
        }} 
        transition={{repeat:Infinity,duration:1,ease:"easeInOut"}}
        className="flex flex-col items-center">
            <img src={money_icon} alt="Loading" className="w-[200px]"  />
        </motion.div>
    </div>
  )
}

export default LoadingPage
