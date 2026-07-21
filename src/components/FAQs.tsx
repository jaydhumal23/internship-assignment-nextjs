"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqCategory = "course" | "delivery" | "misc";

const faqData = {
  course: [
    {
      q: "What domains do your corporate programs cover?",
      a: "We design tailored training across four primary tracks: Technology & Software Engineering (Cloud, DevOps, Architecture), Non-Technical (Product Management, Business Analytics), Emerging Tech (Generative AI, Machine Learning, Data Science), and Senior Leadership (Agile transformations, Strategic Tech Management).",
    },
    {
      q: "Can we customize the curriculum to use our own internal code repositories?",
      a: "Absolutely. In fact, that is our primary value proposition. We work with your tech leads during the Skill Gap Analysis phase to integrate your APIs, tech stacks, and internal guidelines directly into the curriculum and live coding labs.",
    },
  ],
  delivery: [
    {
      q: "What delivery formats are supported?",
      a: "We support three delivery models: Live Virtual cohorts (interactive real-time online classes with mentors), On-Site Physical classrooms (intensive workshops at your corporate offices), or Hybrid/Blended formats combining self-paced materials with periodic live sync sessions.",
    },
    {
      q: "Who are the instructors delivering the programs?",
      a: "Our instructors are active industry practitioners, principal engineers, tech consultants, and product leaders with years of practical experience at top-tier companies. They do not just teach theory; they teach production best practices.",
    },
    {
      q: "What is the typical cohort size for a corporate batch?",
      a: "We support cohort sizes ranging from small focused teams (10-15 engineers) up to large-scale organization upskilling programs (hundreds of participants divided into structured parallel tracks).",
    },
  ],
  misc: [
    {
      q: "How do we get started with a corporate training program?",
      a: "Simply click on any 'Enquire Now' button on this page, fill out the basic details in the modal form, and our enterprise learning advisors will reach out to you within 24 hours to schedule an initial discovery call.",
    },
    {
      q: "Is there any post-training support or progress tracking?",
      a: "Yes. Every client dashboard tracks participant attendance, assignments, and test scores. Following program completion, we offer follow-up Q&A sessions and provide executive summaries outlining team competency gains.",
    },
  ],
};

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("course");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const currentFaqs = faqData[activeCategory];

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    setOpenIndex(0); // Reset accordion to first item
  };

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
            Common Questions
          </p>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Find quick answers to common questions about our corporate curriculum customization, delivery modes, and post-session tracking.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex border-b border-slate-100 mb-10 overflow-x-auto pb-px">
          {(["course", "delivery", "misc"] as FaqCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`py-3.5 px-6 font-bold text-sm border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200"
              }`}
            >
              {cat === "course" && "About the Course"}
              {cat === "delivery" && "About the Delivery"}
              {cat === "misc" && "Miscellaneous"}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-blue-150 bg-blue-50/10 shadow-xs"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-brand-primary transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-3 text-sm sm:text-base">
                    <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? "text-brand-primary-light" : "text-slate-400"}`} />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-brand-primary" : ""
                    }`}
                  />
                </button>

                {/* Accordion Panel Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pl-13 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/50 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
