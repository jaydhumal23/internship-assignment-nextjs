"use client";

import React, { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    company: "ADP",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/adp.svg",
    quote:
      "We would like to thank Accredian for the wonderful support and the beautiful journey. The team turned our vision into reality with unparalleled dedication, service, and expertise throughout the entire process.",
    name: "Vikram Malhotra",
    role: "VP of Cloud Architecture",
    stat: "2 Production Bots Deployed",
    color: "#EF3340",
  },
  {
    company: "Bayer",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/bayer.svg",
    quote:
      "Accredian's commitment to excellence is unmatched. They consistently go the extra mile to ensure our needs are met and exceeded, providing reliable support and high-quality service every step of the way.",
    name: "Dr. Sarah Jenkins",
    role: "Head of Learning & Development",
    stat: "15% Speedup in Prototyping",
    color: "#10B04A",
  },
  {
    company: "Reliance Industries",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/rel.png",
    quote:
      "Choosing Accredian for the learning & development of our employees was a beneficial decision. The value derived from the course is immense & their support team is always there to help our employees.",
    name: "Arjun Mehta",
    role: "Director of Enterprise Engineering",
    stat: "400+ Employees Trained",
    color: "#CC8A00",
  },
  {
    company: "HCL Technologies",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hcl.png",
    quote:
      "Accredian delivered a uniquely tailored curriculum that matched our engineering team's needs perfectly. The hands-on project-based approach accelerated our workforce transformation and yielded measurable productivity gains.",
    name: "Priya Sharma",
    role: "Chief Learning Officer",
    stat: "30% Productivity Gain",
    color: "#0066B2",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setProgress(0);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        next();
      }
    }, 30);
    return () => clearInterval(tick);
  }, [current, next]);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-900 scroll-mt-20 overflow-hidden relative"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-black uppercase tracking-widest mb-4">
            Impact Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Clients
            </span>{" "}
            Are Saying
          </h2>
        </div>

        {/* Main card */}
        <div className="relative">
          <div
            className={`bg-slate-800/70 backdrop-blur-md border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${animating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
          >
            {/* Progress bar */}
            <div className="h-[3px] bg-slate-700 w-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-none rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-start lg:items-center">

              {/* Left — logo + stat */}
              <div className="flex flex-col items-center lg:items-start gap-6 shrink-0 lg:w-56">
                <div className="bg-white rounded-2xl p-4 w-28 h-28 flex items-center justify-center shadow-lg">
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/100x100/1e293b/94a3b8?text=" +
                        t.company.charAt(0);
                    }}
                  />
                </div>
                <div className="text-center lg:text-left">
                  <span
                    className="block text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: t.color }}
                  >
                    {t.company}
                  </span>
                  <div className="inline-block px-3 py-1 rounded-lg text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow">
                    {t.stat}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px self-stretch bg-slate-700/70" />

              {/* Right — quote + bio */}
              <div className="flex-1">
                {/* Big quote mark */}
                <svg
                  className="w-10 h-10 text-blue-500/30 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <blockquote className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base shrink-0 shadow-md"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-white text-sm block">
                      {t.name}
                    </cite>
                    <span className="text-xs text-slate-400 font-semibold">
                      {t.role} &bull;{" "}
                      <strong className="text-slate-300">{t.company}</strong>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom: logo strip dots + nav */}
        <div className="mt-10 flex flex-col items-center gap-6">

          {/* Company logo dot switcher */}
          <div className="flex items-center gap-3 sm:gap-6">
            {testimonials.map((item, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`View ${item.company} testimonial`}
                className={`relative flex items-center justify-center rounded-xl bg-white transition-all duration-300 cursor-pointer shadow-md ${idx === current
                  ? "w-20 h-12 sm:w-24 sm:h-14 ring-2 ring-blue-400 scale-110"
                  : "w-14 h-10 sm:w-16 sm:h-10 opacity-40 hover:opacity-70 hover:scale-105"
                  }`}
              >
                <img
                  src={item.logo}
                  alt={item.company}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === current
                  ? "w-8 bg-blue-400"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
