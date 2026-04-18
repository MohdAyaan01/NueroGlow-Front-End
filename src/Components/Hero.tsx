import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";


const Hero = () => {

    const navigate = useNavigate();

  return (
    <div className='relative w-full flex flex-col justify-center items-center bg-[#09090b] min-h-screen pt-20 overflow-hidden'>
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className='relative z-10 text-center mb-8 px-4'>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                <span className="text-xs font-medium text-zinc-300">Empower your workflow instantly</span>
            </div>

            <h1 className='text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tight text-white mx-auto leading-tight md:leading-tight mb-6'>
                Create amazing content <br className="hidden md:block" /> with <span className='bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-400'>AI tools</span>
            </h1>
            
            <p className='mt-6 max-w-xl 2xl:max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed px-2'>
                Transform your content creation with our suite of top-tier AI tools. Write exceptional articles, generate hyper-realistic images, and drastically enhance your daily workflow in seconds.
            </p>
        </div>
        
        <div className='relative z-10 flex flex-wrap justify-center gap-5 mt-4 px-4'>
            <button onClick={() => {navigate('/ai')}} className='bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400 text-white font-medium px-8 py-3.5 rounded-full shadow-lg shadow-fuchsia-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer'>
                Start creating now
            </button>
            <button className='bg-zinc-900 text-white font-medium px-8 py-3.5 rounded-full border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 hover:scale-105 active:scale-95 transition-all text-sm sm:text-base cursor-pointer'>
                Watch demo
            </button>
        </div>
        
        <div className='relative z-10 flex flex-col items-center gap-3 mt-16 text-zinc-500 font-medium text-sm'>
            <div className="flex -space-x-4 mb-2">
                <img src={assets.user_group} alt="Trusted Users" className='h-10 w-auto opacity-80 filter brightness-110' />
            </div>
            <span>Trusted by 10k+ professionals worldwide</span>
        </div>
        
        {/* Fading bottom border for smooth scroll transition into other sections */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
    </div>
  )
}

export default Hero