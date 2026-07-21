"use client";

import React from "react";
import { Users, GraduationCap, Laptop } from "lucide-react";

const stats = [
  {
    value: "10K+",
    label: "Professionals Trained",
    description: "Upskilled across software engineering, AI, product management, and data domains.",
    icon: Users,
    colorClass: "bg-blue-500/10 text-blue-600 border-blue-100",
  },
  {
    value: "200+",
    label: "Corporate Sessions",
    description: "Tailored executive workshops, cohort bootcamps, and interactive live webinars.",
    icon: Laptop,
    colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-100",
  },
  {
    value: "5K+",
    label: "Active Learners",
    description: "Ongoing platform access, assignments completion, and sandbox sandbox usage.",
    icon: GraduationCap,
    colorClass: "bg-purple-500/10 text-purple-600 border-purple-100",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="py-16 bg-white border-y border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Our Track Record at a Glance
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            We partner with leading enterprises to build continuous learning channels and upskill the modern workforce.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative bg-slate-50 hover:bg-white hover:shadow-xl rounded-2xl p-8 border border-slate-100 hover:border-slate-200/80 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Icon Container */}
                <div className={`p-4 rounded-2xl border mb-6 transition-all duration-300 group-hover:scale-110 ${stat.colorClass}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {/* Large Stat Value */}
                <span className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-none mb-2">
                  {stat.value}
                </span>
                
                {/* Stat Label */}
                <span className="text-base font-bold text-slate-900 mb-2">
                  {stat.label}
                </span>
                
                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
