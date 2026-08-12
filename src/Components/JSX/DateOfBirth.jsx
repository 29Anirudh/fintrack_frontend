import React from 'react';
import { CiCalendarDate } from "react-icons/ci";

const DateOfBirth = ({ userDetails, setUserDetails }) => {
  return (
    <div
      className="flex flex-row items-center backdrop-blur-3xl border border-white/10 gap-2 bg-white/10 rounded-lg px-3 py-2 transition-all focus-within:border-violet-200 shadow-2xl"
    >
      {/* Custom calendar icon */}
      <div className="p-2">
        <CiCalendarDate size={18} color="white" />
      </div>

      <div className="flex flex-col flex-1">
        <label className="text-xs text-slate-400">
          Date of Birth
        </label>

        <input
          type="date"
          name="dob"
          value={userDetails.dateofbirth || ""}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              dateofbirth: e.target.value
            })
          }
          className="
            text-slate-300
            outline-none
            text-sm
            bg-transparent
            w-full
            date-input
          "
        />
      </div>
    </div>
  );
};

export default DateOfBirth;