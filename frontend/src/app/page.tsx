'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white font-sans overflow-hidden relative selection:bg-[#C084FC] selection:text-black">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 sm:px-12 py-6 max-w-7xl mx-auto">
        
        {/* Brand Group (Saturn + Utopia) */}
        <div className="flex items-center gap-3">
          <Image 
            src="/saturn.png" 
            alt="Saturn Orbit" 
            width={28} 
            height={28} 
            className="opacity-100 animate-spin-slow" 
          />
          <Image 
            src="/utopia-logo.png" 
            alt="Utopia GEU" 
            width={100} 
            height={32} 
            className="invert opacity-95" 
          />
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/rules" className="hover:text-white transition-colors">Protocol</Link>
          <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2 text-sm font-semibold bg-white text-black hover:bg-gray-200 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Sign Up & Trade
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-8 pb-32 px-4 max-w-6xl mx-auto text-center">
        
        {/* Headline Section */}
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300">
              Coding Experience
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Unlock your competitive potential in a fully regulated environment, powered by Utopia GEU.
          </p>
        </div>

        {/* Central Stage with Popping 3D Anomaly Core (Side Cards Removed) */}
        <div className="relative w-full max-w-4xl h-[320px] sm:h-[400px] flex items-center justify-center my-4">
          
          {/* Central Liquid 3D Core with Interactive Hover Pop Effect */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center z-20 group cursor-pointer">
            <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-3xl transition-all duration-500 group-hover:bg-purple-500/50 group-hover:scale-125" />
            <Image 
              src="/anomaly-core.png" 
              fill 
              alt="Central Liquid Asset" 
              className="object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_80px_rgba(192,132,252,0.8)] animate-float"
              priority
            />
          </div>

        </div>

        {/* Main CTA Button */}
        <div className="mt-6 relative z-30">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full font-semibold text-base transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.7)] hover:-translate-y-0.5 inline-block"
          >
            Sign Up & Trade
          </Link>
        </div>

      </main>

      {/* Subtle Grid Floor */}
      <div className="fixed bottom-0 left-0 w-full h-[25vh] bg-[linear-gradient(transparent_95%,rgba(147,51,234,0.1)_100%),linear-gradient(90deg,transparent_95%,rgba(147,51,234,0.1)_100%)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-20 pointer-events-none z-0" />
    </div>
  );
}