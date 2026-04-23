import React, { useState } from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import LogoSaaS from "../assets/logo.jpeg"
import { FaXmark } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import Sidebar from '../Components/Sidebar';
import { useSelector } from 'react-redux';

interface User{
  _id: string;
  name?: string;
  email?: string;
  credit?: number;
}

interface RootState{
  app:{
    user: User | null
  }
}

const Layout:React.FC = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [showCredits, setShowCredits] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
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

          {/* Transparent Overlay to Close Dropdowns */}
          {(showCredits || showProfile) && (
            <div 
              className="fixed inset-0 z-[40]" 
              onClick={() => { setShowCredits(false); setShowProfile(false); }}
            />
          )}

          <div className="hidden md:flex items-center gap-3 relative z-[50]">
            
            {/* Credits Button & Dropdown */}
            <div className="relative">
              <div 
                onClick={() => { setShowCredits(!showCredits); setShowProfile(false); }}
                className="flex items-center gap-2 cursor-pointer bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                <span className="text-xs font-semibold text-zinc-300">Credits</span>
                <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>

              {/* Credits Dropdown */}
              {showCredits && (
                <div className="absolute top-12 right-0 w-72 bg-[#0c0c0e] border border-zinc-800 rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-200">Free Plan</span>
                    <svg className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                      <span className="text-md font-bold text-zinc-100">AI Credits</span>
                    </div>
                    <span className="text-md font-bold text-zinc-100">{user?.credit || 0}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 w-[5%]" />
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 py-2.5 rounded-xl transition-colors">
                      Get More
                    </button>
                    <button 
                      onClick={() => { setShowCredits(false); navigate('/Pricing'); }}
                      className="flex-1 bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/30 text-xs font-semibold text-indigo-300 py-2.5 rounded-xl transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Glowing Upgrade Button */}
            <div className="relative group cursor-pointer z-[50]">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-5 py-2 bg-[#121217] rounded-full border border-black/50">
                <button className="text-xs font-semibold text-zinc-100 tracking-wide" onClick={()=>navigate('/Pricing')}>Upgrade</button>
              </div>
            </div>

            {/* Profile Button & Dropdown */}
            <div className="relative">
              <div 
                onClick={() => { setShowProfile(!showProfile); setShowCredits(false); }}
                className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-4 py-2 rounded-full transition-colors ml-2"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                   {user?.name ? (
                     <span className="text-[10px] font-bold text-emerald-400">{user.name.charAt(0).toUpperCase()}</span>
                   ) : (
                     <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                   )}
                </div>
                <span className="text-xs font-semibold text-zinc-300">Profile</span>
              </div>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute top-12 right-0 w-72 bg-[#0c0c0e] border border-zinc-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Header */}
                  <div className="p-5 border-b border-zinc-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {user?.name?.charAt(0).toUpperCase() || 'M'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100 truncate">{user?.name || 'Mohdayaan'}</span>
                        <span className="text-[9px] font-bold bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded shrink-0">FREE</span>
                      </div>
                      <span className="text-xs text-zinc-500 truncate">{user?.email || 'user@example.com'}</span>
                    </div>
                  </div>

                  {/* Menu Sections */}
                  <div className="py-2">
                    {/* Section 1 */}
                    <div className="flex flex-col border-b border-zinc-800/50 pb-2 mb-2">
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                          Appearance
                        </div>
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Language
                        </div>
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                          Prompt Templates
                        </div>
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>

                    {/* Section 2 */}
                    <div className="flex flex-col border-b border-zinc-800/50 pb-2 mb-2">
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                          Notifications
                        </div>
                      </button>
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          Settings
                        </div>
                      </button>
                    </div>

                    {/* Section 3 */}
                    <div className="flex flex-col border-b border-zinc-800/50 pb-2 mb-2">
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                          What's new
                        </div>
                      </button>
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Help center
                        </div>
                      </button>
                      <button className="flex items-center justify-between px-5 py-2.5 hover:bg-zinc-800/50 text-zinc-300 transition-colors w-full">
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          Contact
                        </div>
                      </button>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col p-2 space-y-1">
                      <button className="flex items-center gap-3 px-3 py-2 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-xl transition-colors w-full text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        Community Profile
                      </button>
                      <button className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300 rounded-xl transition-colors w-full text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Log out
                      </button>
                    </div>

                  </div>
                </div>
              )}
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