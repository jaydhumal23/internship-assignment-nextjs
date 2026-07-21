"use client";

import React from "react";

const logoItems = [
  // Reliance
  (
    <div key="reliance" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <span className="text-lg font-black tracking-tight text-blue-900 flex items-center gap-1 whitespace-nowrap">
        <span className="w-4.5 h-4.5 rounded-full bg-red-600 inline-block border-2 border-yellow-400" />
        RELIANCE
      </span>
    </div>
  ),
  // HCL
  (
    <div key="hcl" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <span className="text-xl font-black tracking-tighter text-blue-800 whitespace-nowrap">
        HCL <span className="text-blue-500 font-normal">Tech</span>
      </span>
    </div>
  ),
  // IBM
  (
    <div key="ibm" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <svg className="h-6 w-auto fill-blue-700" viewBox="0 0 100 40">
        <rect x="0" y="2" width="100" height="2" />
        <rect x="0" y="7" width="100" height="2" />
        <rect x="0" y="12" width="100" height="2" />
        <rect x="0" y="17" width="100" height="2" />
        <rect x="0" y="22" width="100" height="2" />
        <rect x="0" y="27" width="100" height="2" />
        <rect x="0" y="32" width="100" height="2" />
        <rect x="0" y="37" width="100" height="2" />
        <text x="5" y="31" fontFamily="sans-serif" fontSize="34" fontWeight="900" fill="none" stroke="white" strokeWidth="8">IBM</text>
        <text x="5" y="31" fontFamily="sans-serif" fontSize="34" fontWeight="900">IBM</text>
      </svg>
    </div>
  ),
  // CRIF
  (
    <div key="crif" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <span className="text-xl font-extrabold tracking-widest text-slate-800 flex items-center whitespace-nowrap">
        CRIF<span className="text-blue-600">.</span>
      </span>
    </div>
  ),
  // ADP
  (
    <div key="adp" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <span className="text-2xl font-black italic tracking-tighter text-red-600 whitespace-nowrap">
        ADP
      </span>
    </div>
  ),
  // Bayer
  (
    <div key="bayer" className="h-12 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <div className="flex items-center gap-1.5 border border-slate-300 px-3 py-1.5 rounded-full bg-white shadow-xs whitespace-nowrap">
        <span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] text-white font-black">B</span>
        <span className="text-xs font-bold text-slate-800">BAYER</span>
      </div>
    </div>
  ),
];

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

        {/* Brand Marquee Flow */}
        <div className="relative w-full overflow-hidden mask-fade-edges mt-4">
          
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 25s linear infinite;
            }
            .mask-fade-edges {
              mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            }
          `}</style>

          <div className="flex items-center gap-16 w-max animate-marquee py-2 opacity-75">
            
            {/* Set 1 */}
            <div className="flex items-center gap-16 shrink-0">
              {logoItems}
            </div>

            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
