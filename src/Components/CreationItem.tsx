import React, { useState } from 'react'
import Markdown from 'react-markdown';

import { Creation } from '../types';

interface CreationItemProps {
    item: Creation;
}

const CreationItem: React.FC<CreationItemProps> = ({ item }) => {

    const [expanded, setExpanded] = useState(false);
    
    return (
        <div onClick={() => setExpanded(!expanded)} className='group p-5 w-full bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-xl cursor-pointer hover:border-fuchsia-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-md relative overflow-hidden'>
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className='flex items-center justify-between gap-4 relative z-10'>
                <div className="flex-1">
                    <h2 className='text-base font-semibold text-zinc-100 group-hover:text-fuchsia-400 transition-colors line-clamp-1'>
                        {item.prompt || "Untitled Generation"}
                    </h2>
                    <p className='text-zinc-500 text-xs mt-1.5 flex items-center gap-2'>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70 inline-block"></span>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }) : 'Generated Just now'}
                    </p>
                </div>
                <button className='bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/20 text-xs font-medium px-4 py-1.5 rounded-full capitalize transition-colors tracking-wide'>
                    {item.type}
                </button>
            </div>
            
            <div className={`grid transition-all duration-500 ease-in-out ${expanded ? 'grid-rows-[1fr] mt-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    {item.type === 'image' ? (
                        <div className="p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50 flex justify-center">
                            <img src={item.content} alt='Generated Image' className='w-full max-w-md rounded shadow-lg shadow-black/50' />
                        </div>
                    ) : (
                        <div className='p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50 max-h-96 overflow-y-auto custom-scrollbar text-sm text-zinc-300 leading-relaxed font-sans'>
                            <div className='prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-fuchsia-400'>
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CreationItem