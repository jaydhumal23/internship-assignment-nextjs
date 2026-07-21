"use client";

import React from "react";

export default function Clients() {
  return (
    <section id="clients" className="py-16 bg-slate-50 border-b border-slate-100 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
            Corporate Partnerships
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Empowering professionals in world-class organizations through targeted corporate bootcamps.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="relative w-full">
          {/* Logo container wrapper for horizontal display */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
            
            {/* Reliance */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <span className="text-lg font-black tracking-tight text-blue-900 flex items-center gap-1">
                <span className="w-4.5 h-4.5 rounded-full bg-red-600 inline-block border-2 border-yellow-400" />
                RELIANCE
              </span>
            </div>

            {/* HCL */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <span className="text-xl font-black tracking-tighter text-blue-800">
                HCL <span className="text-blue-500 font-normal">Tech</span>
              </span>
            </div>

            {/* IBM */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <svg className="h-6 w-auto fill-blue-700" viewBox="0 0 100 40">
                <rect x="0" y="2" width="100" height="2" />
                <rect x="0" y="7" width="100" height="2" />
                <rect x="0" y="12" width="100" height="2" />
                <rect x="0" y="17" width="100" height="2" />
                <rect x="0" y="22" width="100" height="2" />
                <rect x="0" y="27" width="100" height="2" />
                <rect x="0" y="32" width="100" height="2" />
                <rect x="0" y="37" width="100" height="2" />
                {/* Overlay clip shapes for letters I, B, M */}
                <text x="5" y="31" fontFamily="sans-serif" fontSize="34" fontWeight="900" fill="none" stroke="white" strokeWidth="8">IBM</text>
                <text x="5" y="31" fontFamily="sans-serif" fontSize="34" fontWeight="900">IBM</text>
              </svg>
            </div>

            {/* CRIF */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <span className="text-xl font-extrabold tracking-widest text-slate-800 flex items-center">
                CRIF<span className="text-brand-accent">.</span>
              </span>
            </div>

            {/* ADP */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <span className="text-2xl font-black italic tracking-tighter text-red-600">
                ADP
              </span>
            </div>

            {/* Bayer */}
            <div className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300">
              <div className="flex items-center gap-1.5 border border-slate-300 px-3 py-1.5 rounded-full bg-white shadow-xs">
                <span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] text-white font-black">B</span>
                <span className="text-xs font-bold text-slate-800">BAYER</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
