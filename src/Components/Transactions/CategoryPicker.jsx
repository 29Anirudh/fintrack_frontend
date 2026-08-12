import { AnimatePresence,motion } from "motion/react";
import { useState } from "react";

const CategoryPicker = ({ defaultOption = "Select", options, selectedOption, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='w-full relative'>
            <motion.div whileTap={{scale:0.98}} className={`w-full flex justify-between items-center border border-transparent p-2 rounded hover:border-violet-500 transition-all focus:scale-105 cursor-pointer bg-white/10`} onClick={toggleDropdown}>
                <h1 className=''>{selectedOption || defaultOption}</h1>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute flex flex-col w-full bg-slate-900 rounded-lg mt-1 z-10"
                    >
                    {options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-violet-600 transition-all cursor-pointer ${selectedOption === option ? 'bg-violet-600' : 'bg-slate-900/50'}`}
                                    onClick={() =>{
                                    toggleDropdown(); 
                                    onOptionSelect(option)}}
                                >
                                    <h1 className=''>{option}</h1>
                                </div>
                            ))
                    }
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CategoryPicker
