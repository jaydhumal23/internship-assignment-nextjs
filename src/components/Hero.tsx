"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onEnquireClick: () => void;
}

// Words to cycle through for each blue slot
const WORDS_1 = ["Expertise", "Innovation", "Excellence", "Solutions"];
const WORDS_2 = ["Enterprise", "Workforce", "Business", "Teams"];

function useTypewriter(words: string[], typingSpeed = 80, erasingSpeed = 45, pauseMs = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIdx < word.length) {
        timeout = setTimeout(() => {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("erasing"), 200);
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, erasingSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, charIdx, wordIdx, words, typingSpeed, erasingSpeed, pauseMs]);

  // longest word = ghost placeholder width
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");
  return { display, longest };
}

function TypewriterWord({ words, delay = 0 }: { words: string[]; delay?: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const { display, longest } = useTypewriter(started ? words : [words[0]]);
  const text = started ? display : words[0];

  return (
    // Ghost span keeps the width of the longest word so surrounding text never shifts
    <span className="relative inline-block" style={{ verticalAlign: "baseline" }}>
      {/* Invisible ghost = always full width of longest word */}
      <span
        aria-hidden
        className="invisible select-none font-serif italic font-semibold"
      >
        {longest}
      </span>
      {/* Visible animated text sits on top */}
      <span
        className="absolute inset-0 font-serif italic font-semibold bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] bg-clip-text text-transparent"
        aria-live="off"
      >
        {text}
      </span>
    </span>
  );
}

export default function Hero({ onEnquireClick }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-slate-50/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Containerized Hero Card */}
        <div className="relative bg-gradient-to-br from-[#EEF5FF] via-white to-[#F8FAFC] rounded-[32px] sm:rounded-[40px] border border-blue-100/55 p-8 sm:p-12 lg:py-16 lg:px-16 shadow-[0_20px_50px_rgba(26,115,232,0.04)] overflow-hidden">

          {/* Decorative subtle ambient glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

            {/* Left Text details */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left">

              {/* Badge Tag */}
              <div className="inline-flex self-center lg:self-start items-center gap-1.5 px-3.5 py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-xs font-extrabold uppercase tracking-wider mb-6">
                Corporate Upskilling Redefined
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Next-Gen <TypewriterWord words={WORDS_1} delay={400} /> For Your <TypewriterWord words={WORDS_2} delay={1600} />
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Empower your teams with customized training programs, industry-aligned curricula, and measurable impact tracking. Discover the CAT framework and unlock organizational transformation.
              </p>

              {/* Core Features Checkmarks */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-10 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Tailored Solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Industry Insights</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Expert Guidance</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onEnquireClick}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] hover:from-[#1d4ed8] hover:to-[#4338ca] text-white font-black text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Enquire Now
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <a
                  href="#accredian-edge"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column (Professionals Cutout Image aligned to bottom card border) */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end self-end -mb-4 sm:-mb-8 lg:-mb-10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[620px] aspect-square lg:aspect-auto lg:h-[440px] xl:h-[500px] flex items-end">
                <Image
                  src={isHovered ? "/cutiepro.png" : "/hero-v2.png"}
                  alt="Accredian Enterprise Upskilling Professionals"
                  width={420}
                  height={420}
                  className="w-full h-auto object-contain mix-blend-multiply scale-[1.1] transition-all duration-300 ease-out"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
