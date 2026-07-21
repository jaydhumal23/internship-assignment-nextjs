"use client";

import React from "react";
import {
  Lightbulb,
  Brain,
  Users,
  BarChart2,
  Settings,
  Globe,
  Wallet,
  CheckCircle2
} from "lucide-react";

interface DomainExpertiseProps {
  onEnquireClick: (domain?: string) => void;
}

const domains = [
  {
    title: "Product & Innovation Hub",
    icon: Lightbulb,
    mapDomain: "Product Management",
    desc: "PRDs, roadmap planning, user research, wireframing, and product growth funnels."
  },
  {
    title: "Gen-AI Mastery",
    icon: Brain,
    mapDomain: "Artificial Intelligence",
    desc: "Generative AI, LLMs in production, finetuning, and RAG vector search integrations."
  },
  {
    title: "Leadership Elevation",
    icon: Users,
    mapDomain: "Strategy & Leadership",
    desc: "Digital transformation leadership, legacy migrations, agile scaling, and sprint models."
  },
  {
    title: "Tech & Data Insights",
    icon: BarChart2,
    mapDomain: "Data Science",
    desc: "Python analytics, database queries, Tableau dashboards, and machine learning pipelines."
  },
  {
    title: "Operations Excellence",
    icon: Settings,
    mapDomain: "Project Management",
    desc: "Agile methodologies, project lifecycles, resource allocations, and operational efficiency."
  },
  {
    title: "Digital Enterprise",
    icon: Globe,
    mapDomain: "Digital Transformation",
    desc: "Cloud infrastructures, DevOps pipeline building, container orchestration, and web security."
  },
  {
    title: "Fintech Innovation Lab",
    icon: Wallet,
    mapDomain: "Finance",
    desc: "Financial operations, investment modeling, risk analyses, and digital payment frameworks."
  }
];



export default function DomainExpertise({ onEnquireClick }: DomainExpertiseProps) {
  return (
    <section id="domain-expertise" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Our <span className="inline-block font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent pb-0.5">Domain Expertise</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-semibold">
            Specialized Programs <span className="text-[#2A75E6]">Designed to Fuel Innovation</span>
          </p>
        </div>

        {/* 7-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {domains.map((domain, idx) => {
            const Icon = domain.icon;
            const isLast = idx === domains.length - 1;

            return (
              <div
                key={idx}
                onClick={() => onEnquireClick(domain.mapDomain)}
                className={`bg-white border border-slate-150 hover:border-blue-300 rounded-3xl p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer ${isLast ? "lg:col-start-2" : ""
                  }`}
              >
                {/* Circle Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#2A75E6] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Domain Title */}
                <h3 className="text-lg font-black text-slate-800 mb-2.5 group-hover:text-[#2A75E6] transition-colors duration-300">
                  {domain.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-semibold font-sans">
                  {domain.desc}
                </p>

                {/* Submitting CTA Anchor */}
                <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-[#2A75E6] transition-colors">
                  Enquire Program
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
