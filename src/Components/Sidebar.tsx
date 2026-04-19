import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEraser, FaHashtag, FaSquare, FaUser } from 'react-icons/fa';
import { FaHouse, FaScissors } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { setUser } from '../redux/appSlice';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { RootState } from '../redux/store';

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: FaHouse },
    { to: '/ai/write-article', label: 'Write Article', Icon: FaSquare },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: FaHashtag },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: FaEraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: FaScissors },
    { to: '/ai/community', label: 'Community', Icon: FaUser },
]

interface SidebarProps {
    sidebar: boolean;
    setSidebar: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebar, setSidebar }) => {
    const { user } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await api.get("/api/auth/logout");
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    if (!user) return null;

    return (
        <div className={`relative z-40 w-64 bg-[#09090b] border-r border-zinc-800 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            {/* Subtle inner highlight */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent"></div>
            
            <div className='mt-8 w-full px-4'>
                <div className='w-16 h-16 rounded-full mx-auto bg-gradient-to-br from-fuchsia-600 to-indigo-500 shadow-lg shadow-fuchsia-500/20 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/10'>
                    {(user.username || user.name || "?").charAt(0).toUpperCase()}
                </div>
                <h1 className='mt-3 text-center font-semibold text-zinc-100'>{user.username || user.name}</h1>
                <p className='text-center text-xs text-zinc-500'>Pro Member</p>
                
                <div className='mt-8 flex flex-col gap-1.5 text-sm font-medium'>
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.to === '/ai'} onClick={() => setSidebar(false)} className={({ isActive }) => `px-4 py-3 flex items-center gap-3.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-fuchsia-600/10 to-indigo-500/10 text-zinc-100 border border-fuchsia-500/20 shadow-sm shadow-fuchsia-500/5' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                            {({ isActive }) => (
                                <>
                                    <item.Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-fuchsia-400' : 'text-zinc-500'}`} />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
            
            <div className='w-full border-t border-zinc-800 p-5 flex items-center justify-between gap-3 bg-zinc-950/30'>
                <div className='flex gap-3 items-center cursor-pointer'>
                    <div className='w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-fuchsia-500/20 border border-white/10'>
                        {(user.username || user.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <h1 className='text-sm leading-tight text-zinc-200 font-medium truncate max-w-[100px]'>{user.username || user.name}</h1>
                    </div>
                </div>
                <div onClick={logoutHandler} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer group tooltip-trigger">
                    <IoMdLogOut className='w-5 h-5' />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
