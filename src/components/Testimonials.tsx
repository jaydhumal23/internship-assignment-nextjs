"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Head of Learning & Development",
    company: "Bayer Corp",
    quote: "The customized data analytics roadmap designed by Accredian matched our capability gaps exactly. Our product divisions have reported an immediate 15% increase in dashboard prototyping speed and pipeline design velocity.",
    stat: "15% Speedup",
  },
  {
    name: "Vikram Malhotra",
    role: "VP of Cloud Architecture",
    company: "ADP Solutions",
    quote: "We chose Accredian to upskill our senior engineering teams in Generative AI pipelines and Pinecone vector databases. The hands-on labs were top-tier, and our developers deployed two production bots within a month of completion.",
    stat: "2 Production Bots",
  },
  {
    name: "Arjun Mehta",
    role: "Director of Enterprise Engineering",
    company: "Reliance Industries",
    quote: "Enterprise upskilling at scale is a huge logistical challenge. Accredian solved this with flexible delivery formats (live virtual combined with localized bootcamps) and excellent progress dashboards that kept our stakeholders fully informed.",
    stat: "400+ Trained",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000); // Auto scroll every 8s
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const selectSlide = (idx: number) => {
    if (isAnimating || idx === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white scroll-mt-20 overflow-hidden relative">
      {/* Decorative Blur Ambient Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-accent/15 border border-brand-accent/20 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Impact Stories
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Enterprise Partners Say
          </h2>
        </div>

        {/* Carousel Window */}
        <div className="relative bg-slate-800/60 border border-slate-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          
          {/* Quote Icon watermark */}
          <div className="absolute top-6 right-8 text-slate-700/25 pointer-events-none select-none">
            <Quote className="w-20 h-20 fill-current rotate-180" />
          </div>

          {/* Testimonial Content Block */}
          <div className={`transition-all duration-500 ease-in-out ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            
            {/* Stat Tag */}
            <div className="inline-block px-3 py-1 bg-brand-accent text-slate-900 text-xs font-black uppercase rounded-lg mb-6 shadow-md">
              {testimonials[currentIndex].stat}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* User Bio */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center font-black text-white text-lg border border-slate-700 shadow-md">
                {testimonials[currentIndex].name.split(" ").pop()?.[0] || "U"}
              </div>
              <div>
                <cite className="not-italic font-bold text-slate-100 text-base block">
                  {testimonials[currentIndex].name}
                </cite>
                <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                  {testimonials[currentIndex].role} &bull; <strong className="text-brand-accent">{testimonials[currentIndex].company}</strong>
                </span>
              </div>
            </div>

          </div>

          {/* Carousel Arrows */}
          <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shadow-lg hover:scale-105 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2">
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shadow-lg hover:scale-105 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-8 bg-brand-accent" : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
