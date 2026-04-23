import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaCheck, FaBolt, FaStar, FaArrowLeft } from "react-icons/fa6"
import PaymentButton from "../Components/PaymentButton"
const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false)

    const plans = [
        {
            name: "Pro",
            price: isAnnual ? "499" : "49",
            period: isAnnual ? "/yr" : "/mo",
            description: "For creators who need more power and speed.",
            features: ["Unlimited Portfolios", "Premium Components", "Advanced AI Training", "Priority Support", "Custom Domains"],
            gradient: "from-purple-500/20 to-transparent",
            border: "border-purple-500/30",
            buttonColor: "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]",
            popular: true,
            icon: <FaStar size={20} className="text-purple-400" />
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "Bespoke solutions for agencies and teams.",
            features: ["White-labeling", "Team Collaboration", "Custom AI Models", "Dedicated Manager", "API Access"],
            gradient: "from-zinc-500/20 to-transparent",
            border: "border-white/10",
            buttonColor: "bg-white/10 hover:bg-white/20 text-white",
            icon: <FaCheck size={20} className="text-white" />
        }
    ]

    return (
        <div className="min-h-[100vh] w-full bg-[#09090B] text-white overflow-y-auto overflow-x-hidden pb-20 relative">
            {/* Top Back Button */}
            <Link
                to="/ai"
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-500 hover:text-fuchsia-500 transition-colors font-bold text-[10px] uppercase tracking-widest group bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5 hover:border-fuchsia-500/20"
            >
                <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />
            </div>

            <div className="relative pt-24 px-4 max-w-7xl mx-auto flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-16 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-teal-400 uppercase tracking-widest mb-6 translate-y-0 animate-in fade-in duration-700">
                        <FaStar size={12} fill="currentColor" />
                        Pricing Plans
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Choose Your Vision.
                    </h1>
                    <p className="text-lg text-slate-400 mb-10">
                        Transparent pricing for creators of all scales. No hidden fees.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-slate-500'} transition`}>Monthly</span>
                        <button 
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-12 h-6 bg-white/10 rounded-full p-1 relative hover:bg-white/20 transition"
                        >
                            <div className={`w-4 h-4 bg-teal-500 rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm ${isAnnual ? 'text-teal-400 font-medium' : 'text-slate-500'} transition`}>Annual (Save 20%)</span>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 w-full items-start pb-20">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`
                                relative group p-px rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]
                            `}
                        >
                            {/* Card Border Flare */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${plan.border.replace('border-', 'from-')} to-transparent opacity-50 group-hover:opacity-100 transition`} />
                            
                            {/* Card Body */}
                            <div className="relative h-full flex flex-col p-8 bg-[#0C0C0C]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/5">
                                {plan.popular && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-teal-500/50 transition">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="mb-8 items-baseline">
                                    <span className="text-4xl font-bold">{plan.price !== 'Custom' ? '$' : ''}{plan.price}</span>
                                    <span className="text-slate-500 ml-1 text-sm">{plan.period}</span>
                                </div>

                                <div className="flex-grow space-y-4 mb-10">
                                    {plan.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shrink-0">
                                                <FaCheck size={12} className="text-teal-500" />
                                            </div>
                                            <span className="text-sm text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                   {plan.name === 'Pro' ? (
                                    <PaymentButton className={`w-full py-4 rounded-2xl font-bold transition duration-300 ${plan.buttonColor}`}>
                                        Get Started
                                    </PaymentButton>
                                ) : (
                                    <button className={`w-full py-4 rounded-2xl font-bold transition duration-300 ${plan.buttonColor}`}>
                                        Get Started
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Link or Footer Info */}
                <div className="mt-8 text-center pb-12">
                    <p className="text-slate-500 text-sm">
                        All plans include 14-day free trial. Need something else? 
                        <Link to="/Contact" className="text-teal-400 hover:underline inline-flex items-center gap-1 ml-1 transition">
                            Contact Us <FaBolt size={10} fill="currentColor" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PricingPage
