import React, { useState } from 'react'
import { FaScissors } from 'react-icons/fa6';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface RemoveObjectResponse {
  success: boolean,
  content: string,
  message?: string
}


const RemoveObject:React.FC = () => {
  const [input, setInput] = useState<File | null>(null);
  const [object, setObject] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const submithandler = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    if(!input){
      toast.error("Please Upload An Image");
      return;
    }
    if(!object.trim()){
      toast.error("Please Enter Object Name");
      return;
    }
      if(object.trim().split(" ").length > 1){
      toast.error("Only One Object Name Allowed");
      return; 
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', input)
      formData.append('object', object)

      const { data } = await api.post("/api/ai/remove-image-object", formData)

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
       const realError = error.response?.data?.message || error.message;
      toast.error(realError);
    }
    setLoading(false);
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-center flex-wrap gap-4 text-slate-700'>
      {/**left col*/}
      <form onSubmit={submithandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
          <FaScissors className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Name To Remove</p>

        <input
          onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
          const file = e.target.files?.[0];
          if(file) setInput(file)
          }}
          type="file"
          accept="image/*"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='e.g., watch or spoon, Only Single Object Name'
          required
        />

        {input && (
          <p className='mt-2 text-xs text-gray-500'>
            Selected file: {input.name}
          </p>
        )}

        <p className='mt-6 text-sm font-medium'>Describe Object name to remove</p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='e.g., watch or spoon, only single object name.'
          required>
        </textarea>

        <button disabled={loading} className='w-full flex justify-center
        items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB]
        text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2
            border-t-transparent animate-spin'></span>
              : <FaScissors className='w-5' />
          }
          Remove object
        </button>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>

        <div className='flex items-center gap-3'>
          <FaScissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {
          !content ?
            (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5
                    text-gray-400'>
                  <FaScissors className='w-9 h-9' />
                  <p>Upload an image and click "Remove Object" to get started</p>
                </div>
              </div>
            )
            :
            (
              <img src={content} alt="image" className='mt-3 w-full h-full' />
            )
        }

      </div>
    </div>
  )
}

export default RemoveObject