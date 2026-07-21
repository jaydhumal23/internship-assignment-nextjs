"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Award, Zap, ShieldCheck } from "lucide-react";

interface HeroProps {
  onEnquireClick: () => void;
}

export default function Hero({ onEnquireClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white"
    >
      {/* Ambient background glow items */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-primary-light/20 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" />
      
      {/* Decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 bg-brand-primary-light/10 border border-brand-primary-light/30 rounded-full text-brand-primary-light text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Corporate Upskilling Redefined
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 animate-slide-up">
              Next-Gen Expertise For Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Enterprise</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Empower your teams with customized training curricula, flexible delivery formats, and measurable impact tracking. Discover the CAT framework and unlock organizational transformation.
            </p>

            {/* Core Values list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 mb-10 text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                <span className="text-sm font-semibold text-slate-200">Tailored Solutions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                <span className="text-sm font-semibold text-slate-200">Industry Insights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                <span className="text-sm font-semibold text-slate-200">Expert Guidance</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onEnquireClick}
                className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-slate-900 font-extrabold text-base rounded-xl shadow-lg hover:shadow-xl hover:shadow-brand-accent/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Enquire Now
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href="#accredian-edge"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Visual Card Block */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md animate-fade-in">
              <div className="absolute -top-6 -left-6 px-4 py-3 bg-brand-accent text-slate-900 font-black rounded-2xl shadow-lg flex items-center gap-2 text-sm">
                <Award className="w-5 h-5 text-slate-900 fill-current" />
                <span>#1 Upskilling Partner</span>
              </div>

              <div className="space-y-6 mt-4">
                <div className="border-b border-slate-700 pb-5">
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Accredian Edge</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Designed to close capability gaps and deliver verifiable corporate training results.
                  </p>
                </div>

                {/* Key items */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Custom Curricula</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Custom training maps designed for your target competencies.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Live Hands-on Labs</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Sandbox virtual labs for realistic coding and tool applications.</p>
                    </div>
                  </div>
                </div>

                {/* Micro statistic */}
                <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 flex items-center justify-between text-center sm:text-left gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Satisfaction</p>
                    <p className="text-xl font-black text-brand-accent mt-0.5">98.4%</p>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Completion</p>
                    <p className="text-xl font-black text-blue-400 mt-0.5">92%</p>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Instructor rating</p>
                    <p className="text-xl font-black text-purple-400 mt-0.5">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
