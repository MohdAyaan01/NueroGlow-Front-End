import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaHandSparkles } from 'react-icons/fa6'
import api from '../api/axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

const WriteArticle = () => {

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const submithandler = async (e:React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `
      Write a detailed, well-structured article on "${input}". 
      Include:
      - Introduction
      - Multiple headings and subheadings
      - Examples where applicable
      - Conclusion
      - Flowing transitions between sections
      - Comprehensive coverage of the topic`;

      const { data } = await api.post("/api/ai/generate-article", { prompt })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='min-h-[calc(100vh-64px)] p-6 flex flex-col items-center flex-wrap gap-4 text-zinc-300 w-full mb-10'>
      {/*left col*/}
      <form onSubmit={submithandler} className='w-full max-w-4xl p-6 bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-800 shadow-xl relative z-10 group hover:border-fuchsia-500/30 transition-all duration-300'>
        <div className='flex items-center gap-3'>
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <FaHandSparkles className='w-5 h-5 text-indigo-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>Article Configuration</h1>
        </div>
        <p className='mt-6 mb-2 text-sm font-medium text-zinc-400'>Article Topic</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className='w-full p-3 outline-none text-sm rounded-xl bg-zinc-950/50 border border-zinc-700/50 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all text-zinc-200'
          placeholder='Future Is Here...'
          required
        />
        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400 text-white px-4 py-3 mt-6 text-sm font-medium rounded-xl cursor-pointer shadow-lg shadow-fuchsia-500/20 transition-all'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <FaEdit className='w-5' />
          }
          Generate Article Here
        </button>
      </form>
      
      {/*Right Col*/}
      <div className='w-full max-w-4xl p-6 bg-zinc-950/50 backdrop-blur-xl rounded-2xl flex flex-col border border-zinc-800 shadow-xl min-h-[300px] overflow-hidden relative z-10'>

        <div className='flex items-center gap-3 border-b border-zinc-800/50 pb-4 mb-4'>
          <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
             <FaEdit className='w-5 h-5 text-fuchsia-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>Generated Output</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center border border-dashed border-zinc-700/50 rounded-xl bg-zinc-900/20 p-10'>
            <div className='text-sm flex flex-col items-center gap-4 text-zinc-500'>
              <FaEdit className='w-8 h-8 opacity-50' />
              <p>Enter a topic and click "Generate Article" to get Started</p>
            </div>
          </div>
        ) : (
          <div className='overflow-y-auto text-sm max-h-[500px] custom-scrollbar pr-2'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default WriteArticle