import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { AiToolsData } from '../assets/assets';

const AiTool = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.app);

    const handleToolClick = (toolPath: string) => {
        if (user) {
            navigate(toolPath);
        } else {
            navigate('/login');
        }
    }

    return (
        <div className='relative w-full py-24 bg-[#09090b] overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8'>
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[-15%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Glowing Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md relative z-10">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                <span className="text-xs font-medium text-zinc-300">Intelligent Features</span>
            </div>

            <div className='text-center relative z-10'>
                <h2 className='text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400'>Powerful AI Tools</h2>
                <p className='text-base text-zinc-400 mt-5 max-w-xl mx-auto'>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>
            </div>
            
            <div className='flex flex-wrap mt-16 justify-center gap-6 max-w-7xl mx-auto relative z-10'>
                {AiToolsData.map((tool, index) => (
                    <div 
                        key={index} 
                        className='group relative w-full sm:w-[320px] flex flex-col items-start border border-zinc-800 p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-xl shadow-xl hover:-translate-y-2 hover:border-fuchsia-500/30 transition-all duration-500 cursor-pointer overflow-hidden' 
                        onClick={() => handleToolClick(tool.path)}
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Icon */}
                        <div className="relative z-10 shadow-lg shadow-black/20 rounded-xl overflow-hidden">
                            <tool.Icon className='w-14 h-14 p-3.5 text-white' style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }} />
                        </div>
                        
                        {/* Typography */}
                        <h3 className='mt-8 mb-3 text-xl font-semibold text-zinc-100 group-hover:text-fuchsia-400 transition-colors duration-300 relative z-10'>
                            {tool.title}
                        </h3>
                        <p className='text-zinc-400 text-sm leading-relaxed relative z-10'>
                            {tool.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTool
