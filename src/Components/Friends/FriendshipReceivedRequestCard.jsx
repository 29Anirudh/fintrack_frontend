import { RiCloseFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

const FriendshipReceivedRequestCard = ({ request, index }) => {
    const colors = [
        '#0F172A',
        '#172554',
        '#1E3A8A',
        '#312E81',
        '#3730A3',
        '#4C1D95',
        '#581C87',
        '#164E63',
        '#134E4A',
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    return (
        <div key={index} className='flex w-full justify-between p-3 bg-slate-900 rounded-xl'>
            <div className="flex">
                <div className='rounded-full p-2 w-14 h-14 flex items-center justify-center text-lg font-semibold' style={{ backgroundColor:getRandomColor()}}>{request?.name.substring(0, 1)}</div>
                <div className="flex flex-col justify-center ml-3">
                    <span className="font-semibold">{request.name}</span>
                    <span className="text-slate-400">{request.username}</span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2">
                <div className="bg-slate-600 px-3 rounded-xl hover:bg-red-700/20 hover:text-red-600 transition-all"><RiCloseFill size={22}/></div>
                <div className="bg-green-500 px-3 rounded-xl hover:bg-green-700 transition-all"><TiTick size={22}/></div>
            </div>
        </div>
    )
}

export default FriendshipReceivedRequestCard
