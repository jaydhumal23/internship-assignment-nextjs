"use client";

import React from "react";
import { Check, ClipboardList, PenTool, Radio } from "lucide-react";

const pillars = [
  {
    title: "Custom Curricula",
    desc: "Every enterprise cohort receives tailored training materials built directly for their tools, APIs, and product stacks.",
  },
  {
    title: "Flexible Delivery",
    desc: "Choose between live instructor-led virtual sessions, local classroom instruction, or blended self-paced options.",
  },
  {
    title: "Measurable Impact",
    desc: "Track learner metrics, homework submissions, and final assessments directly via client reports.",
  },
];

const timelineSteps = [
  {
    number: "01",
    title: "Skill Gap Analysis",
    description: "We work with your engineering and business managers to evaluate current team competency and design learning targets.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Customized Training Plan",
    description: "Our instructors map out modular syllabi, interactive exercises, and customized code repositories for hands-on learning.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Flexible Program Delivery",
    description: "We roll out training cohorts with continuous feedback loops, active mentoring, and post-session code reviews.",
    icon: Radio,
  },
];

export default function AccredianEdge() {
  return (
    <section id="accredian-edge" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
            Why Partner With Us
          </p>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight mt-2">
            The Accredian Edge
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            High-caliber skill programs engineered specifically for corporate structures and high-growth teams.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-1.5 bg-brand-primary/5 rounded-full text-brand-primary shrink-0 mt-1">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Timeline / Process Stepper */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-primary-light/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Stepper Headline */}
          <div className="relative mb-12 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
              How We Deliver Results
            </h3>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Our 3-step delivery model is designed to align with corporate training requirements and verify competency milestones.
            </p>
          </div>

          {/* Desktop/Mobile Process Line */}
          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden md:block absolute top-[43px] left-[40px] right-[40px] h-0.5 bg-slate-800" />
            
            {/* Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {timelineSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group">
                    
                    {/* Stepper Dot & Number */}
                    <div className="flex items-center justify-between mb-4 w-full max-w-[200px] md:max-w-none">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-brand-accent transition-all duration-300 group-hover:border-brand-accent group-hover:bg-slate-800 shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-black text-slate-800 font-mono tracking-tighter select-none pr-2">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-brand-accent transition-colors duration-300">
                      {step.title}
                    </h4>

                    {/* Step Description */}
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                      {step.description}
                    </p>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
