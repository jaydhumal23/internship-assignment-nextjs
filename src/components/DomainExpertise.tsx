"use client";

import React, { useState } from "react";
import { Terminal, Database, Shield, BarChart, Settings, Rocket, Cpu, Eye, Users, TrendingUp } from "lucide-react";

type TabId = "tech" | "non-tech" | "emerging" | "senior";

const domainData = {
  tech: {
    title: "Technology & Engineering",
    description: "Build robust systems and scale your digital architectures with modern practices.",
    courses: [
      { name: "Software Engineering & Architecture", desc: "Clean code, design patterns, microservices, and system design.", icon: Terminal },
      { name: "Cloud Computing & DevOps", desc: "AWS/Azure infrastructures, Terraform, Docker, Kubernetes, and CI/CD pipelines.", icon: Database },
      { name: "Cybersecurity & Information Security", desc: "Network security, vulnerability assessments, penetration testing, and compliance.", icon: Shield },
    ],
  },
  "non-tech": {
    title: "Product & Business Analytics",
    description: "Align technical execution with market strategies and data-driven insights.",
    courses: [
      { name: "Product Management Bootcamps", desc: "PRDs, roadmap planning, user research, wireframing, and product analytics.", icon: Settings },
      { name: "Business Analytics & BI", desc: "SQL databases, Tableau dashboard designs, predictive modeling, and data pipelines.", icon: BarChart },
      { name: "Growth Marketing & SEO Strategies", desc: "CAC/LTV calculations, performance channels, search optimization, and web funnels.", icon: Rocket },
    ],
  },
  emerging: {
    title: "Emerging Technologies",
    description: "Harness the power of next-gen computing and automated cognitive models.",
    courses: [
      { name: "Generative AI & LLMs in Production", desc: "RAG pipelines, vector databases (Pinecone), model finetuning, and API integrations.", icon: Cpu },
      { name: "Machine Learning & Data Science", desc: "Python analytics, regression, neural networks, TensorFlow, and pandas libraries.", icon: Database },
      { name: "Computer Vision & NLP Applications", desc: "Object detection, transformer models, sentiment analysis, and token modeling.", icon: Eye },
    ],
  },
  senior: {
    title: "Senior & Executive Leadership",
    description: "Navigate digital transformations and steer cross-functional initiatives.",
    courses: [
      { name: "Digital Transformation Leadership", desc: "SaaS migrations, legacy refactoring strategies, and organizational restructuring.", icon: TrendingUp },
      { name: "Agile Leadership & Operations", desc: "Scaling frameworks (SAFe), scrum master strategies, and sprint planning.", icon: Users },
    ],
  },
};

const catFramework = [
  {
    letter: "C",
    title: "Concept",
    desc: "Laying the foundations. Classroom theory, code-walkthroughs, and structural blueprints lead by seasoned industry experts.",
    colorClass: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    letter: "A",
    title: "Application",
    desc: "Translating words into code. Live virtual sandbox environments, homework repositories, and interactive group sprints.",
    colorClass: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    letter: "T",
    title: "Transformation",
    desc: "Realizing output. Rigorous final assessments, project code reviews, and comprehensive capability dashboard summaries.",
    colorClass: "bg-purple-50 border-purple-200 text-purple-700",
  },
];

export default function DomainExpertise() {
  const [activeTab, setActiveTab] = useState<TabId>("tech");

  const currentTab = domainData[activeTab];

  return (
    <section id="cat-framework" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
            Training Specializations
          </p>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight mt-2">
            Our Domain Expertise
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            Choose from a wide variety of program categories mapped to current workforce requirements.
          </p>
        </div>

        {/* Tabs Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(Object.keys(domainData) as TabId[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === tabKey
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {domainData[tabKey].title.split(" & ")[0]} {/* Shorten label for buttons */}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-lg mb-20 animate-fade-in">
          <div className="max-w-xl mb-8">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{currentTab.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{currentTab.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTab.courses.map((course, idx) => {
              const Icon = course.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-2xl transition-all duration-300 flex flex-col group hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-auto">{course.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CAT Framework Section */}
        <div className="mt-12">
          {/* CAT Headings */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
              Execution Methodology
            </p>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight mt-2">
              The CAT Framework
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
              We structure all cohorts around the <strong>Concept-Application-Transformation</strong> path, ensuring concepts map to production outputs.
            </p>
          </div>

          {/* CAT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catFramework.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-150 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col"
              >
                {/* Visual Letter Logo Badge */}
                <div
                  className={`absolute -top-6 left-8 w-12 h-12 rounded-xl border flex items-center justify-center text-xl font-black shadow-md ${item.colorClass}`}
                >
                  {item.letter}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
