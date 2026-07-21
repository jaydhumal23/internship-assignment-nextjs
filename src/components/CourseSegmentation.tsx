"use client";

import React from "react";

const segments = [
  {
    title: "Program Specific",
    desc: "Certificate, Executive, Post Graduate Certificate",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=260&q=80",
    zoom: false
  },
  {
    title: "Industry Specific",
    desc: "IT, Healthcare, Retail, Finance, Education, Manufacturing",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=260&q=80",
    zoom: false
  },
  {
    title: "Topic Specific",
    desc: "Machine Learning, Design, Analytics, Cybersecurity, Cloud",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=260&q=80",
    zoom: false
  },
  {
    title: "Level Specific",
    desc: "Senior Leadership, Mid-Career Professionals, Freshers",
    image: "/raj.png",
    zoom: true
  }
];

export default function CourseSegmentation() {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Tailored <span className="inline-block font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent pb-0.5">Course Segmentation</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-semibold">
            Explore <span className="text-[#2A75E6]">Custom-fit Courses</span> Designed to Address Every Professional Focus
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {segments.map((segment, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="h-44 overflow-hidden relative">
                <img
                  src={segment.image}
                  alt={segment.title}
                  className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${segment.zoom ? "scale-[1.2]" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col items-center justify-center flex-grow text-center">
                <h3 className="text-base font-black text-slate-800 mb-2 group-hover:text-[#2A75E6] transition-colors duration-300">
                  {segment.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {segment.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
