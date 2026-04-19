import React, { useState } from 'react'
import api from '../api/axios';
import { Hash } from 'lucide-react';
import Markdown from 'react-markdown';
import toast from 'react-hot-toast';

const BlogTitles:React.FC = () => {

  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

  const [selectedCategory, setSelectedCategory] = useState<string>('General')
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate exactly 5 highly engaging, SEO-optimized blog titles about the topic: "${input}". Tailor the titles specifically for the "${selectedCategory}" category. Make them click-worthy.`;

      const { data } = await api.post("/api/ai/generate-blog-title", { prompt })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error:any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-col lg:flex-row items-start gap-8 text-zinc-300 custom-scrollbar'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full lg:w-1/2 p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl hover:border-fuchsia-500/30 transition-all duration-300 relative z-10'>
        <div className='flex items-center gap-3'>
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Hash className='w-5 h-5 text-purple-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>AI Title Generator</h1>
        </div>
        <p className='mt-6 mb-2 text-sm font-medium text-zinc-400'>Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className='w-full p-3 outline-none text-sm rounded-xl bg-zinc-950/50 border border-zinc-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-zinc-200'
          placeholder='The future of artificial intelligence is...'
          required
        />

        <p className='mt-6 mb-3 text-sm font-medium text-zinc-400'>Category</p>

        <div className='flex gap-2.5 flex-wrap'>
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-2 border rounded-full cursor-pointer transition-colors duration-200 ${selectedCategory === item ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-md shadow-fuchsia-500/20' : 'text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300 bg-zinc-950/30'
                }`}
              key={item}>
              {item}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading} className='w-full flex justify-center
          items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400
          text-white px-4 py-3 mt-4 text-sm font-medium rounded-xl cursor-pointer shadow-lg shadow-fuchsia-500/20 transition-all'>
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2
              border-t-transparent animate-spin'></span> : <Hash className='w-5' />}
          Generate title
        </button>
      </form>
      {/* Right col */}
      <div className='w-full lg:w-1/2 p-6 bg-zinc-950/50 backdrop-blur-xl rounded-2xl flex flex-col border border-zinc-800 shadow-xl min-h-[400px] relative z-10'>

        <div className='flex items-center gap-3 border-b border-zinc-800/50 pb-4 mb-4'>
           <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
             <Hash className='w-5 h-5 text-fuchsia-400' />
          </div>
          <h1 className='text-xl font-bold text-zinc-100'>Generated Titles</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center border border-dashed border-zinc-700/50 rounded-xl bg-zinc-900/20 p-10'>
            <div className='text-sm flex flex-col items-center gap-4 text-zinc-500'>
              <Hash className='w-8 h-8 opacity-50' />
              <p>Type a keyword and click "Generate title" to get started</p>
            </div>
          </div>
        ) : (
          <div className='h-full overflow-y-auto text-sm custom-scrollbar pr-2'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default BlogTitles