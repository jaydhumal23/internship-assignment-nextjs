"use client";

import React from "react";
import { Lightbulb, Laptop, Settings } from "lucide-react";

const catFramework = [
  {
    title: "Concept",
    desc: "Foundational knowledge for deep subject understanding.",
    icon: Lightbulb,
  },
  {
    title: "Application",
    desc: "Practical implementation through real-world scenarios.",
    icon: Laptop,
  },
  {
    title: "Tools",
    desc: "Resources and techniques for effective skill mastery.",
    icon: Settings,
  },
];

export default function CatFramework() {
  return (
    <section id="cat-framework" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            The <span className="inline-block font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent pb-0.5">CAT</span> Framework
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-semibold">
            Our Proven Approach to Learning Excellence
          </p>
        </div>

        {/* CAT Grid */}
        <div className="relative mt-16 max-w-5xl mx-auto px-4">

          {/* Desktop continuous SVG connection path */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 900 350" fill="none">
              <path
                d="M 150,175 C 320,175 320,70 450,70 C 580,70 580,280 750,280"
                stroke="#2A75E6"
                strokeWidth="3"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className="opacity-40"
              />
              <circle cx="150" cy="175" r="5" fill="#2A75E6" />
              <circle cx="750" cy="280" r="5" fill="#2A75E6" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 justify-items-center">
            {catFramework.map((item, idx) => {
              const Icon = item.icon;

              const positionClass =
                idx === 0
                  ? "lg:-translate-y-8"
                  : idx === 1
                    ? "lg:translate-y-0"
                    : "lg:translate-y-8";

              return (
                <div
                  key={idx}
                  className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-blue-600/30 bg-white flex flex-col items-center justify-center p-6 text-center shadow-xs hover:shadow-xl hover:border-blue-600 hover:scale-105 transition-all duration-500 relative group ${positionClass}`}
                >
                  {/* Floating Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-extrabold uppercase rounded-full shadow-xs">
                    Step 0{idx + 1}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2A75E6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <h4 className="text-lg font-black text-slate-800 mb-2.5 group-hover:text-[#2A75E6] transition-colors duration-300">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[200px] font-semibold">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
