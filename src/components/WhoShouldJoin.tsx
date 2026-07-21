"use client";

import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const ScreenCheckIcon = () => (
  <div className="text-white shrink-0">
    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M9 10l2 2l4 -4" strokeWidth="2.5" stroke="#34d399" />
    </svg>
  </div>
);

const ScreenCrossIcon = () => (
  <div className="text-white shrink-0">
    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M9 8l6 6M15 8l-6 6" strokeWidth="2.5" stroke="#f87171" />
    </svg>
  </div>
);

export default function WhoShouldJoin() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner Card */}
        <div className="relative bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto min-h-[680px] flex flex-col lg:flex-row">

          {/* Circular background wave detail */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="200" r="260" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Cutout Image — centered in the gap, anchored to bottom, inside card */}
          <div className="absolute bottom-0 left-[32%] lg:left-[34%] -translate-x-1/2 w-80 sm:w-96 lg:w-[820px] h-auto select-none pointer-events-none z-20">
            <img
              src="/var2.png"
              alt="Corporate Professionals"
              className="object-contain object-bottom w-full h-auto drop-shadow-[0_-4px_24px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Left Side — text only, no image */}
          <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-12 lg:p-16 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-black text-blue-200 uppercase tracking-widest mb-2">
              Who Should Join?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Strategic Skill <br className="hidden sm:inline" /> Enhancement
            </h2>
          </div>

          {/* Right Side Cohorts 2x2 Grid */}
          <div className="relative z-10 w-full lg:w-[55%] self-center grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t lg:border-t-0 lg:border-l border-white/20 p-8 sm:p-12 lg:p-16 lg:pl-12">

            {/* Tech Professionals */}
            <div className="flex items-start gap-4">
              <ScreenCheckIcon />
              <div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  Tech Professionals
                </h4>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-semibold">
                  Enhance expertise, embrace tech, drive Innovation.
                </p>
              </div>
            </div>

            {/* Non-Tech Professionals */}
            <div className="flex items-start gap-4">
              <ScreenCrossIcon />
              <div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  Non-Tech Professionals
                </h4>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-semibold">
                  Adapt digitally, collaborate in tech environments.
                </p>
              </div>
            </div>

            {/* Emerging Professionals */}
            <div className="flex items-start gap-4">
              <div className="text-white shrink-0">
                <GraduationCap className="w-9 h-9 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  Emerging Professionals
                </h4>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-semibold">
                  Develop powerful skills for rapid career growth.
                </p>
              </div>
            </div>

            {/* Senior Professionals */}
            <div className="flex items-start gap-4">
              <div className="text-white shrink-0">
                <Briefcase className="w-9 h-9 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  Senior Professionals
                </h4>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-semibold">
                  Strengthen leadership, enhance strategic decisions.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
