import React from 'react'
import LogoSaaS from "../assets/logo.jpeg"

const Footer = () => {
    return (
        <footer className='relative bg-[#09090b] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden'>
            <div className="absolute top-0 left-[10%] w-[80%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            
            <div className='w-full max-w-7xl mx-auto relative z-10'>

                <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
                    <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                        <img src={LogoSaaS} alt="Logo" className='h-16 rounded-full shadow-lg shadow-fuchsia-500/10' />
                        <p className='text-sm text-zinc-400 mt-6 max-w-sm leading-relaxed'>
                            Transform your daily workflow with our suite of powerful AI tools. Join endless other professionals growing with us.
                        </p>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-zinc-100 font-semibold tracking-wide uppercase'>Important Links</h3>
                        <div className="flex flex-col gap-3 mt-6">
                            <a href="#" className='text-sm text-zinc-400 hover:text-fuchsia-400 hover:translate-x-1 transition-all duration-300'>Home</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-fuchsia-400 hover:translate-x-1 transition-all duration-300'>Features</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-fuchsia-400 hover:translate-x-1 transition-all duration-300'>Pricing</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-fuchsia-400 hover:translate-x-1 transition-all duration-300'>Contact</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-fuchsia-400 hover:translate-x-1 transition-all duration-300'>FAQ</a>
                        </div>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-zinc-100 font-semibold tracking-wide uppercase'>Social Links</h3>
                        <div className="flex flex-col gap-3 mt-6">
                            <a href="#" className='text-sm text-zinc-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300'>Twitter X</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300'>Instagram</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300'>YouTube</a>
                            <a href="#" className='text-sm text-zinc-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300'>LinkedIn</a>
                        </div>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-zinc-100 font-semibold tracking-wide uppercase'>Stay Updated</h3>
                        <p className='text-xs text-zinc-500 mt-4 mb-4'>Subscribe for the latest AI product updates and news.</p>
                        <div className="flex items-center border gap-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-md h-12 max-w-80 w-full rounded-full overflow-hidden transition-all focus-within:border-fuchsia-500/50 focus-within:ring-1 focus-within:ring-fuchsia-500/50">
                            <input type="email" placeholder="Enter your email.." className="w-full h-full pl-5 outline-none text-sm bg-transparent text-zinc-200 placeholder-zinc-500" required />
                            <button type="submit" className="bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400 active:scale-95 transition-all w-32 h-[38px] rounded-full font-medium text-xs text-white cursor-pointer mr-1.5 shadow-lg shadow-fuchsia-500/20">Subscribe</button>
                        </div>
                    </div>

                </div>

                <div className='w-full h-px mt-16 mb-6 bg-gradient-to-r from-transparent via-zinc-800 to-transparent'></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className='text-xs text-zinc-500'>© 2026 DocuBrain AI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href='#' className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors'>Terms of Service</a>
                        <div className='w-1 h-1 rounded-full bg-zinc-700'></div>
                        <a href='#' className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors'>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer