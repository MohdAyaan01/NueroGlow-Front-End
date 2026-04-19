import React, { useState } from 'react'
import { FaEraser } from 'react-icons/fa';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface RemoveBgResponse{
  success: boolean;
  content: string;
  message?: string;
}

const RemoveBackground:React.FC = () => {

  const [input, setInput] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const submithandler = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if(!input){
        toast.error("Please Select An Image");
        return;
      }
      formData.append('image', input)

      const { data } = await api.post<RemoveBgResponse>("/api/ai/remove-image-background", formData)

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message || "Something Went Wrong");
      }
    } catch (error:any) {
      toast.error(error.message)
    }finally{
    setLoading(false)
  }
}

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-col lg:flex-row items-center lg:items-start gap-8 text-zinc-300 custom-scrollbar'>
      {/*left col*/}
      <form onSubmit={submithandler} className='w-full lg:w-1/2 max-w-2xl p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-all duration-300 relative z-10'>
        <div className='flex items-center gap-3'>
           <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
             <FaEraser className='w-5 h-5 text-indigo-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>Remove Background</h1>
        </div>
        <p className='mt-8 mb-2 text-sm font-medium text-zinc-400'>Upload Image</p>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-xl cursor-pointer bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-indigo-500/50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-zinc-400"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-zinc-500">Supports JPG, PNG (Max 5MB)</p>
            </div>
            <input 
              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
                const file = e.target.files?.[0];
                if(file)setInput(file)
              }} 
              type="file" 
              className="hidden" 
              accept="image/*" 
              required 
            />
        </label>

        {input && (
          <div className='mt-4 p-3 bg-zinc-950/40 border border-zinc-800 rounded-lg flex items-center justify-between'>
             <p className='text-sm text-zinc-300 truncate max-w-[80%]'>{input.name}</p>
             <span className="text-xs text-fuchsia-400">Selected</span>
          </div>
        )}

        <button disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white px-4 py-3 mt-8 text-sm font-medium rounded-xl cursor-pointer shadow-lg shadow-indigo-500/20 transition-all'>
          {
            loading ?
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <FaEraser className='w-5' />
          }
          Remove Background Automatically
        </button>
      </form>
      {/*Right Col */}
      <div className='w-full lg:w-1/2 max-w-2xl p-6 bg-zinc-950/50 backdrop-blur-xl rounded-2xl flex flex-col border border-zinc-800 shadow-xl min-h-[400px] relative z-10'>

        <div className='flex items-center gap-3 border-b border-zinc-800/50 pb-4 mb-4'>
           <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
             <FaEraser className='w-5 h-5 text-fuchsia-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>Processed Image</h1>
        </div>

        {
          !content ? (
            <div className='flex-1 flex justify-center items-center border border-dashed border-zinc-700/50 rounded-xl bg-zinc-900/20 p-10 mt-2'>
              <div className='text-sm flex flex-col items-center gap-4 text-zinc-500'>
                <FaEraser className='w-8 h-8 opacity-50' />
                <p>Upload an image and click "Remove Background" to see magic!</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 rounded-xl overflow-hidden bg-zinc-900/50 flex items-center justify-center border border-zinc-800/50 p-2 mt-2">
                <img src={content} alt='image' className='max-w-full max-h-[400px] object-contain rounded-lg shadow-xl' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RemoveBackground