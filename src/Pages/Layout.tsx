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
      <nav className='relative z-50 w-full px-8 min-h-16 flex items-center justify-between border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl transition-all duration-300'>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <img src={LogoSaaS} alt='Logo' className='h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg shadow-fuchsia-500/20 hover:scale-105 transition-transform' />
          <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 hidden sm:block">NeuroGlow AI</span>
        </div>
        {
          sidebar ? <FaXmark onClick={() => setSidebar(false)} className='h-6 w-6 text-zinc-400 hover:text-zinc-100 transition-colors sm:hidden cursor-pointer' />
            : <IoIosMenu onClick={() => setSidebar(true)} className='h-6 w-6 text-zinc-400 hover:text-zinc-100 transition-colors sm:hidden cursor-pointer' />
        }
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