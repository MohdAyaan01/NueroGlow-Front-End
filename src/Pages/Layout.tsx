import React, { useState } from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import LogoSaaS from "../assets/logo.jpeg"
import { FaXmark } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import Sidebar from '../Components/Sidebar';
import { useSelector } from 'react-redux';

interface User{
  _id: string
}

interface RootState{
  app:{
    user: User | null
  }
}

const Layout:React.FC = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const { user } = useSelector((state:RootState)=>state.app);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className='flex flex-col items-start justify-start h-screen overflow-hidden bg-[#09090b] text-zinc-200'>
      <nav className='relative z-50 w-full px-6 min-h-[72px] flex items-center justify-between border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl transition-all duration-300'>
        {/* Left Side: Logo & Workspace */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src={LogoSaaS} alt='Logo' className='h-10 w-10 sm:h-11 sm:w-11 rounded-xl shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-transform' />
          <div className="flex flex-col hidden sm:flex">
            <span className="text-[11px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 uppercase mb-0.5">NeuroGlow AI</span>
            <span className="text-sm font-semibold tracking-wide text-zinc-100 leading-none">Workspace</span>
          </div>
        </div>

        {/* Right Side: Pro Navigation Bar */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            
            {/* Credits Button */}
            <div className="flex items-center gap-2 cursor-pointer bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-full transition-colors">
              <span className="text-xs font-semibold text-zinc-300">Credits</span>
              <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>

            {/* Glowing Upgrade Button */}
            <div className="relative group cursor-pointer">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-5 py-2 bg-[#121217] rounded-full border border-black/50">
                <button className="text-xs font-semibold text-zinc-100 tracking-wide" onClick={()=>navigate('/Pricing')}>Upgrade</button>
              </div>
            </div>

            {/* Profile Button */}
            <div className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-4 py-2 rounded-full transition-colors ml-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                 <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <span className="text-xs font-semibold text-zinc-300">Profile</span>
            </div>

          </div>

          {/* Mobile Menu Toggles */}
          {
            sidebar ? <FaXmark onClick={() => setSidebar(false)} className='h-6 w-6 text-zinc-400 hover:text-zinc-100 transition-colors sm:hidden cursor-pointer' />
              : <IoIosMenu onClick={() => setSidebar(true)} className='h-6 w-6 text-zinc-400 hover:text-zinc-100 transition-colors sm:hidden cursor-pointer' />
          }
        </div>
      </nav>
      <div className='flex-1 w-full h-[calc(100vh-64px)] flex overflow-hidden relative'>
        {/* Subtle Ambient Body Glow */}
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#09090b] overflow-y-auto relative z-10 custom-scrollbar'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;