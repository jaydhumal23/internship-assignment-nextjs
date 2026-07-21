"use client";

import React from "react";
import { Headphones, ChevronRight } from "lucide-react";

interface CtaBannerProps {
  onEnquireClick: () => void;
}

export default function CtaBanner({ onEnquireClick }: CtaBannerProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-blue-600 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Circular background wave details */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 800 200" fill="none">
              <circle cx="400" cy="100" r="150" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="100" r="220" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="100" r="300" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Left / Center Info */}
          <div className="relative flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
            {/* Headphones Badge */}
            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600">
              <Headphones className="w-8 h-8 stroke-[2]" />
            </div>
            
            {/* Text details */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Want to Learn More About Our Training Solutions?
              </h3>
              <p className="text-blue-100 mt-1 text-sm font-semibold">
                Get Expert Guidance for Your Team's Success!
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={onEnquireClick}
              className="px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Contact Us
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
