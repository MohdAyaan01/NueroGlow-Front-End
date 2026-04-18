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
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total Creation Card */}
        <div className='flex justify-between items-center w-72 px-6 py-4 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creation.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <FaSprayCanSparkles className='w-5 text-white' />
          </div>
        </div>
      </div>
      {
        loading ?
          (
            <div className='flex justify-center items-center h-3/4'>
              <div className='animate-spin rounded-full h-11 w-11 border-t-3 border-purple-500 border-t-transparent'></div>
            </div>
          )
          :
          (
            <div className='space-y-3'>
              <p className='mt-6 mb-4 font-medium text-gray-700'>Recent Creations</p>
              {
                creation.length > 0 ? (
                  creation.map((item) => <CreationItem key={item._id} item={item} />)
                ) : (
                  <p className='text-gray-500 text-sm'>No creations yet. Start generating!</p>
                )
              }
            </div>
          )
      }
    </div>
  )
}

export default Dashboard;
