import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const AccountTypeDropdown = ({ accountDetails, setAccountDetails }) => {
  const [open, setOpen] = useState(false);

  const accountTypes = ["Savings", "Current"];

  return (
    <div className="relative w-full">
      {/* Selected box */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left outline-none transition-all hover:border-violet-400/50 focus:shadow-lg focus:shadow-violet-400/10"
      >
        <span
          className={
            accountDetails.accountType
              ? "text-white"
              : "text-white/40"
          }
        >
          {accountDetails.accountType || "Select Account Type"}
        </span>

        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-gray-900 p-1 shadow-xl"
          >
            {accountTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setAccountDetails({
                    ...accountDetails,
                    accountType: type,
                  });
                  setOpen(false);
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-white transition-all hover:bg-violet-500"
              >
                {type}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountTypeDropdown;