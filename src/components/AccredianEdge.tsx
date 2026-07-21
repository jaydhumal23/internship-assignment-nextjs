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
    number: "1",
    title: "Skill Gap Analysis",
    description: "Deep dive assessment of your team's existing skill sets to identify key growth areas and critical technology gaps.",
    icon: ClipboardList,
    theme: {
      iconBg: "bg-blue-50 border-blue-100/50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/20",
      topLineGrad: "from-blue-500 to-indigo-500",
      watermark: "group-hover:text-blue-100/30",
    }
  },
  {
    number: "2",
    title: "Customized Training Plan",
    description: "Co-authoring tailored curricula and hand-picking lab sandboxes to align exactly with your team's target tech stack.",
    icon: PenTool,
    theme: {
      iconBg: "bg-indigo-50 border-indigo-100/50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20",
      topLineGrad: "from-indigo-500 to-purple-500",
      watermark: "group-hover:text-indigo-100/30",
    }
  },
  {
    number: "3",
    title: "Flexible Program Delivery",
    description: "Launching cohorts through interactive virtual learning or local classroom bootcamps, complete with assessment tracking.",
    icon: Radio,
    theme: {
      iconBg: "bg-emerald-50 border-emerald-100/50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20",
      topLineGrad: "from-emerald-500 to-teal-500",
      watermark: "group-hover:text-emerald-100/30",
    }
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
        <div className="bg-gradient-to-br from-slate-100/40 via-white to-blue-50/20 border border-slate-200/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Stepper Headline */}
          <div className="relative mb-14 text-center">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
              How We <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Deliver Results</span> That Matter?
            </h3>
            <p className="text-sm text-slate-500 font-semibold tracking-wide mt-2">
              A Structured Three-Step Approach to Skill Development
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const t = step.theme;

              return (
                <div key={idx} className="relative flex flex-col h-full">
                  {/* Card Container - No side borders, subtle top accent bar */}
                  <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-350 group flex flex-col items-start text-left relative overflow-hidden h-full">
                    
                    {/* Top glow accent line that lights up on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r ${t.topLineGrad} transition-all duration-300`} />

                    {/* Massive watermark number in top right */}
                    <div className={`absolute right-6 top-4 text-7xl font-black text-slate-100/90 select-none transition-colors duration-300 ${t.watermark}`}>
                      0{step.number}
                    </div>

                    {/* Rounded icon box - transitions colors on hover */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-all duration-300 ${t.iconBg}`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
