"use client";

import React from "react";
import { ArrowRight, Check, Zap } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onEnquireClick: () => void;
}

export default function Hero({ onEnquireClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-slate-50/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Containerized Hero Card */}
        <div className="relative bg-gradient-to-br from-[#EEF5FF] via-white to-[#F8FAFC] rounded-[32px] sm:rounded-[40px] border border-blue-100/55 p-8 sm:p-12 lg:py-16 lg:px-16 shadow-[0_20px_50px_rgba(26,115,232,0.04)] overflow-hidden">
          
          {/* Decorative subtle ambient glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Text details */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
              
              {/* Badge Tag */}
              <div className="inline-flex self-center lg:self-start items-center gap-1.5 px-3.5 py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-xs font-extrabold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Corporate Upskilling Redefined
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Next-Gen <span className="text-blue-600">Expertise</span> For Your <span className="text-blue-600">Enterprise</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Empower your teams with customized training programs, industry-aligned curricula, and measurable impact tracking. Discover the CAT framework and unlock organizational transformation.
              </p>

              {/* Core Features Checkmarks */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-10 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Tailored Solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Industry Insights</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Expert Guidance</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onEnquireClick}
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/15 hover:shadow-xl hover:shadow-blue-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Enquire Now
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <a
                  href="#accredian-edge"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column (Professionals Cutout Image) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
              <div className="relative w-full max-w-[380px] lg:max-w-none aspect-square lg:aspect-auto lg:h-[350px] xl:h-[400px] flex items-end">
                <Image
                  src="/hero-banner.png"
                  alt="Accredian Enterprise Upskilling Professionals"
                  width={420}
                  height={420}
                  className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
