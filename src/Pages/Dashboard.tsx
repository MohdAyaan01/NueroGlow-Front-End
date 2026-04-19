import React, { useEffect, useState } from 'react';
import { FaGem } from 'react-icons/fa';
import { FaSprayCanSparkles } from 'react-icons/fa6';
import CreationItem from '../Components/CreationItem';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useCallback } from 'react';

import { Creation } from '../types';

interface DashBoardResponse{
  success:boolean;
  creations:Creation[];
  message?:string
}

const Dashboard:React.FC = () => {

  const [creation, setCreation] = useState<Creation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await api.get<DashBoardResponse>("/api/user/get-user-creations")

      if (data.success) {
        setCreation(data.creations || [])
      } else {
        toast.error(data.message || "Something Went Wrong")
      }
    } catch (error:any) {
      toast.error(error.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData])

  return (
    <div className='h-full overflow-y-scroll p-6 sm:p-10 custom-scrollbar'>
      <div className='mb-8'>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Welcome back!</h1>
        <p className="text-zinc-500 text-sm mt-1">Here is a summary of your recent AI generation activity.</p>
      </div>
      
      <div className='flex justify-start gap-6 flex-wrap mb-10'>
        {/* Total Creation Card (Glassmorphism) */}
        <div className='group relative flex justify-between items-center w-full sm:w-72 px-6 py-6 bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-800 shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-fuchsia-500/30'>
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className='text-zinc-400 z-10'>
            <p className='text-sm font-medium mb-1 uppercase tracking-wider text-zinc-500'>Total Creations</p>
            <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400'>{creation.length}</h2>
          </div>
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-500 text-white flex justify-center items-center shadow-lg shadow-fuchsia-500/30 z-10 relative overflow-hidden'>
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <FaSprayCanSparkles className='w-6 text-white drop-shadow-md' />
          </div>
        </div>
      </div>
      
      {
        loading ?
          (
            <div className='flex justify-center items-center h-48'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-fuchsia-500 border-l-transparent border-b-transparent filter drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]'></div>
            </div>
          )
          :
          (
            <div className='space-y-4'>
              <div className="flex items-center gap-3 mt-6 mb-4">
                 <FaGem className="text-indigo-400 text-sm" />
                 <p className='font-semibold text-zinc-300 text-lg tracking-wide'>Recent Activity</p>
              </div>
              <div className="grid gap-4">
              {
                creation.length > 0 ? (
                  creation.map((item) => <CreationItem key={item._id} item={item} />)
                ) : (
                  <div className="w-full p-10 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
                      <p className='text-zinc-500 text-sm mb-4 text-center'>No creations yet. Your workspace is a blank canvas!</p>
                      <button className="px-6 py-2.5 rounded-full bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors shadow-lg">Start generating</button>
                  </div>
                )
              }
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Dashboard;
