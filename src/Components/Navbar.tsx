import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoSaaS from "../assets/logo.jpeg"
import { FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/appSlice'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { RootState } from '../redux/store'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.app);

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

  return (
    <div className='fixed z-50 w-full bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center py-4 px-4 sm:px-20 xl:px-32 transition-all duration-300'>
      <img src={LogoSaaS} alt='Logo' className='w-12 sm:w-16 cursor-pointer rounded-full shadow-lg shadow-fuchsia-500/20' onClick={() => navigate('/')} />

      {
        user ? (
          <div className='flex items-center gap-6'>
            <span className='text-zinc-300 font-medium text-sm hidden sm:block'>Hi, <span className="text-white">{user.username || user.name}</span></span>
            <button onClick={logoutHandler} className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium text-sm px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300'>Logout</button>
          </div>
        )
          :
          (
            <button onClick={() => navigate('/signup')} className='flex items-center gap-2 rounded-full font-medium text-sm cursor-pointer bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400 text-white px-8 py-2.5 shadow-lg shadow-fuchsia-500/25 transition-all outline-none hover:scale-105 active:scale-95'>
              Get Started <FaArrowRight className='w-3.5 h-3.5' />
            </button>
          )
      }
    </div>
  )
}

export default Navbar
